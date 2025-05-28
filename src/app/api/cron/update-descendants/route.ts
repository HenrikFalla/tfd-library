import { PrismaGlobalClient } from '@/lib/prisma';
import type { Descendant, DescendantList } from '@/types/descendant-list';
import { NextResponse } from 'next/server';

const url = process.env.NEXT_PUBLIC_NEXON_DESCENDANT_LIST as string;
const api_key = process.env.NEXT_PUBLIC_NEXON_API_KEY as string;
const prisma = PrismaGlobalClient;

export async function POST() {
	await UpdateDescendants();
	return NextResponse.json({ message: 'Success' });
}
async function UpdateDescendants() {
	const externalData = (await GetDescendantsExternal()) as DescendantList;
	const dbData = await GetDescendantsDB();
	for (const descendant of externalData) {
		const match = dbData.find(
			(dbDescendant) => dbDescendant.descendant_id === descendant.descendant_id,
		);
		if (match) {
			await prisma.descendant.update({
				where: {
					id: match.id,
				},
				data: {
					descendant_id: descendant.descendant_id,
					descendant_name: descendant.descendant_name,
					descendant_group_id: descendant.descendant_group_id,
					descendant_image_url: descendant.descendant_image_url,
					updatedAt: new Date(),
				},
			});
			for (const skill of descendant.descendant_skill) {
				const skillMatch = match.descendant_skill.find(
					(dbSkill) => dbSkill.skill_name === skill.skill_name,
				);
				if (skillMatch) {
					await prisma.descendantSkill.update({
						where: {
							id: skillMatch.id,
						},
						data: {
							skill_type: skill.skill_type,
							skill_name: skill.skill_name,
							element_type: skill.element_type,
							arche_type: skill.arche_type,
							skill_image_url: skill.skill_image_url,
							skill_description: skill.skill_description,
						},
					});
				} else {
					await prisma.descendantSkill.create({
						data: {
							descendantId: match.id,
							skill_type: skill.skill_type,
							skill_name: skill.skill_name,
							element_type: skill.element_type,
							arche_type: skill.arche_type,
							skill_image_url: skill.skill_image_url,
							skill_description: skill.skill_description,
						},
					});
				}
			}
			for (const stat of descendant.descendant_stat) {
				const statMatch = match.descendant_stats.find(
					(dbStat) => dbStat.level === stat.level,
				);
				if (statMatch) {
					await prisma.descendantStat.update({
						where: {
							id: statMatch.id,
						},
						data: {
							level: stat.level,
						},
					});
					for (const statDetail of stat.stat_detail) {
						const statDetailMatch = statMatch.stat_detail.find(
							(dbStatDetail) => dbStatDetail.stat_id === statDetail.stat_id,
						);
						if (statDetailMatch) {
							await prisma.statDetail.update({
								where: {
									id: statDetailMatch.id,
								},
								data: {
									stat_id: statDetail.stat_id,
									stat_value: statDetail.stat_value,
								},
							});
						} else {
							await prisma.statDetail.create({
								data: {
									descendant_statId: statMatch.id,
									stat_id: statDetail.stat_id,
									stat_value: statDetail.stat_value,
								},
							});
						}
					}
				} else {
					const newStat = await prisma.descendantStat.create({
						data: {
							descendantId: match.id,
							level: stat.level,
						},
					});
					for (const statDetail of stat.stat_detail) {
						await prisma.statDetail.create({
							data: {
								descendant_statId: newStat.id,
								stat_id: statDetail.stat_id,
								stat_value: statDetail.stat_value,
							},
						});
					}
				}
			}
		} else {
			CreateDescendant(descendant);
		}
	}
	return 'Success';
}
async function CreateDescendant(data: Descendant) {
	const newDescendant = await prisma.descendant.create({
		data: {
			descendant_id: data.descendant_id,
			descendant_name: data.descendant_name,
			descendant_group_id: data.descendant_group_id,
			descendant_image_url: data.descendant_image_url,
			updatedAt: new Date(),
		},
	});
	for (const skill of data.descendant_skill) {
		await prisma.descendantSkill.create({
			data: {
				descendantId: newDescendant.id,
				skill_type: skill.skill_type,
				skill_name: skill.skill_name,
				element_type: skill.element_type,
				arche_type: skill.arche_type,
				skill_image_url: skill.skill_image_url,
				skill_description: skill.skill_description,
			},
		});
	}
	for (const stat of data.descendant_stat) {
		const newStat = await prisma.descendantStat.create({
			data: {
				descendantId: newDescendant.id,
				level: stat.level,
			},
		});
		for (const statDetail of stat.stat_detail) {
			await prisma.statDetail.create({
				data: {
					descendant_statId: newStat.id,
					stat_id: statDetail.stat_id,
					stat_value: statDetail.stat_value,
				},
			});
		}
	}
	return newDescendant;
}
async function GetDescendantsExternal() {
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
async function GetDescendantsDB() {
	const response = await prisma.descendant.findMany({
		include: {
			descendant_stats: {
				include: {
					stat_detail: true,
				},
			},

			descendant_skill: true,
		},
	});
	return response;
}
