import { PrismaGlobalClient } from '@/lib/prisma';
import { FirearmAtkType, Weapon } from '@/types/weapon';
import { FirearmAtk } from '@prisma/client';
import { after } from 'next/server';

const url = process.env.NEXT_PUBLIC_NEXON_WEAPON_LIST as string;
const api_key = process.env.NEXT_PUBLIC_NEXON_API_KEY as string;
const prisma = PrismaGlobalClient;

export async function GET() {
	const response = new Response(
		JSON.stringify({
			message: 'Data processing started successfully',
			timestamp: new Date().toISOString(),
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
	after(async () => {
		await UpdateWeapons();
		console.log(`Weapons updated at ${new Date().toISOString()}`);
	});
	return response;
}

async function UpdateWeapons() {
	const externalData = await GetWeaponsExternal();
	for (const weapon of externalData) {
		const weaponDB = await GetWeaponDB(weapon.weapon_id);
		if (weaponDB) {
			UpdateWeapon(weapon, weaponDB as unknown as Weapon);
		} else {
			CreateWeapon(weapon);
		}
	}
}
async function GetWeaponsExternal() {
	const response = await fetch(`${url}?api_key=${api_key}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	const data = await response.json();
	return data;
}
async function UpdateWeapon(weapon: Weapon, weaponDB: Weapon) {
	const updateWeapon = await prisma.weapon.update({
		where: {
			id: weaponDB.id,
		},
		data: {
			weapon_id: weapon.weapon_id,
			weapon_name: weapon.weapon_name,
			image_url: weapon.image_url,
			weapon_type: weapon.weapon_type,
			weapon_type_id: weapon.weapon_type_id,
			weapon_rounds_type: weapon.weapon_rounds_type,
			available_core_slots: weapon.available_core_slots.join(','),
		},
	});
	const updateBaseStat = weapon.base_stat.map((baseStat) => {
		return prisma.weaponBaseStat.updateMany({
			where: {
				weaponId: updateWeapon.id,
				stat_id: baseStat.stat_id,
			},
			data: {
				stat_value: baseStat.stat_value,
			},
		});
	});
	const updateFirearmAtk = weapon.firearm_atk.map(async (firearmAtk) => {
		const firearmAtkDB = await prisma.firearmAtk.findFirst({
			where: {
				weaponId: updateWeapon.id,
				level: firearmAtk.level,
			},
			include: {
				firearm: true,
			},
		});
		if (firearmAtkDB && firearmAtkDB.id) {
			const updateFirearmAtkType = firearmAtk.firearm.map((firearmAtkType) => {
				return prisma.firearmAtkType.updateMany({
					where: {
						firearmAtkId: firearmAtkDB.id,
						firearm_atk_type: firearmAtkType.firearm_atk_type,
					},
					data: {
						firearm_atk_value: firearmAtkType.firearm_atk_value,
					},
				});
			});
			return updateFirearmAtkType;
		}
	});
	return {
		updateWeapon,
		base_stat: updateBaseStat,
		firearm_atk: updateFirearmAtk,
	};
}

async function CreateWeapon(weapon: Weapon) {
	const newWeapon = await prisma.weapon.create({
		data: {
			weapon_name: weapon.weapon_name,
			weapon_id: weapon.weapon_id,
			image_url: weapon.image_url,
			weapon_type: weapon.weapon_type,
			weapon_type_id: weapon.weapon_type_id,
			available_core_slots: weapon.available_core_slots.join(','),
			weapon_rounds_type: weapon.weapon_rounds_type,
		},
	});
	const newBaseStat = weapon.base_stat.map((baseStat) => {
		return prisma.weaponBaseStat.create({
			data: {
				weaponId: newWeapon.id,
				stat_id: baseStat.stat_id,
				stat_value: baseStat.stat_value,
			},
		});
	});
	const newFirearmAtk = weapon.firearm_atk.map(async (firearmAtk) => {
		const newFirearmAttack = await prisma.firearmAtk.create({
			data: {
				weaponId: newWeapon.id,
				level: firearmAtk.level,
			},
		});
		const id = newFirearmAttack.id;
		const newFirearmAtkType = firearmAtk.firearm.map((firearmAtkType) => {
			return prisma.firearmAtkType.create({
				data: {
					firearmAtkId: id,
					firearm_atk_type: firearmAtkType.firearm_atk_type,
					firearm_atk_value: firearmAtkType.firearm_atk_value,
				},
			});
		}) as unknown as Array<FirearmAtkType>;
		return {
			...newFirearmAttack,
			firearm: newFirearmAtkType,
		} as unknown as Array<FirearmAtk>;
	}) as unknown as Array<FirearmAtk>;
	return {
		...newWeapon,
		base_stat: newBaseStat,
		firearm_atk: newFirearmAtk,
	} as unknown as Weapon;
}
// async function GetWeaponsDB() {
// 	const response = await prisma.weapon.findMany({
// 		include: {
// 			base_stat: true,
// 			firearm_atk: {
// 				include: { firearm: true },
// 			},
// 		},
// 	});
// 	return response;
// }
async function GetWeaponDB(weapon_id: string) {
	const response = await prisma.weapon.findUnique({
		where: {
			weapon_id: weapon_id,
		},
		include: {
			base_stat: true,
			firearm_atk: {
				include: { firearm: true },
			},
		},
	});
	return response;
}
