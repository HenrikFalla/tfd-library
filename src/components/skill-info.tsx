import { DescendantSkill } from '@/types/descendant-list';
import Image from 'next/image';

export default function SkillInfo({ data }: { data: DescendantSkill }) {
	return (
		<div className='w-[60vw] md:w-80 bg-gray-300 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 p-4 rounded-lg'>
			<Image
				src={data.skill_image_url}
				alt={data.skill_name}
				width={100}
				height={100}
			/>
			{data.skill_name}
			{data.skill_type}
			{data.arche_type}
			{data.element_type}
			{data.skill_description}
		</div>
	);
}
