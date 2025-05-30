import { DescendantSkill } from '@/types/descendant-list';
import Image from 'next/image';

export default function Skill({ skill }: { skill: DescendantSkill }) {
	return (
		<section>
			<div className='flex flex-row items-center'>
				<Image
					src={skill.skill_image_url}
					alt={skill.skill_name}
					width={75}
					height={75}
				/>
				<div className='flex flex-col ml-2'>
					<h5 className='tracking-widest font-extrabold'>{skill.skill_name}</h5>
					<span className='font-thin tracking-widest'>{skill.skill_type}</span>
				</div>
			</div>
			<div className='flex flex-col gap-2 ml-2'>
				<div className='flex flex-row gap-4'>
					<span>
						<strong>{skill.element_type}</strong>
					</span>
					{skill.arche_type !== null && (
						<span>
							<strong>{skill.arche_type}</strong>
						</span>
					)}
				</div>

				<p className='tracking-wider'>{skill.skill_description}</p>
			</div>
		</section>
	);
}
