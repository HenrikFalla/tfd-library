import { DescendantSkill } from '@/types/descendant-list';
import Image from 'next/image';

export default function Skill({ data }: { data: DescendantSkill }) {
	console.log(data);
	return (
		<figure>
			<Image
				src={data.skill_image_url}
				alt={data.skill_name}
				width={45}
				height={45}
				className='w-fill aspect-square col-span-1'
			/>
		</figure>
	);
}
