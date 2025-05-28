export interface Descendant {
	descendant_id: string;
	descendant_name: string;
	descendant_group_id: string;
	descendant_image_url: string;
	descendant_stat: [DescendantStat];
	descendant_skill: [DescendantSkill];
}
export interface DescendantStat {
	level: number;
	stat_detail: [StatDetail];
}
export interface StatDetail {
	id?: number;
	stat_id: string;
	stat_value: number;
	descendant_statId?: number;
}
export interface DescendantSkill {
	skill_type: string;
	skill_name: string;
	element_type: string;
	arche_type: string;
	skill_image_url: string;
	skill_description: string;
}
export type DescendantList = Descendant[];
