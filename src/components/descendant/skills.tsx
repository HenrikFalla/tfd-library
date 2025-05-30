import { DescendantSkill } from '@/types/descendant-list';
import Skill from './skill';

export default function Skills({ skills }: { skills: DescendantSkill[] }) {
	console.log(skills);
	const passiveSkill = skills.filter((skill) =>
		skill.skill_type.toLowerCase().includes('passive'),
	);
	const activeSkill = skills.filter((skill) =>
		skill.skill_type.toLowerCase().includes('active'),
	);
	console.log('Passive: ', passiveSkill);
	console.log('Active: ', activeSkill);
	return (
		<section>
			<div className='flex flex-col gap-4'>
				<div className='border border-gray-500/25 rounded-2xl p-4'>
					{passiveSkill.map((skill) => {
						return (
							<Skill
								skill={skill}
								key={skill.id}
							/>
						);
					})}
				</div>
				<div className='grid grid-cols-2 gap-4'>
					{activeSkill.map((skill) => {
						return (
							<div
								key={skill.id}
								className='col-span-2 md:col-span-1 border border-gray-500/25 rounded-2xl p-4'
							>
								<Skill skill={skill} />
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
