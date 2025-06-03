export interface Weapon {
	id?: number;
	weapon_id: string;
	weapon_name: string;
	image_url: string;
	weapon_type: string;
	weapon_type_id: string;
	weapon_rounds_type: string;
	available_core_slots: string[];
	base_stat: WeaponBaseStat[];
	firearm_atk: FirearmAtk[];
}
export interface WeaponBaseStat {
	id?: number;
	stat_id: string;
	stat_value: number;
	weaponId?: number;
}
export interface FirearmAtk {
	id?: number;
	level: number;
	firearm: FirearmAtkType[];
}
export interface FirearmAtkType {
	id?: number;
	firearm_atk_type: string;
	firearm_atk_value: number;
}
