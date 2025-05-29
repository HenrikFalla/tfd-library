'use client';
import type {
	Descendant,
	DescendantList,
	DescendantSkill,
} from '@/types/descendant-list';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Skill from '../skill-icons';
import Link from 'next/link';

export function DescendantList() {
	const [isLoading, setIsLoading] = useState(true);
	const [descendants, setDescendants] = useState<DescendantList>([]);
	console.log('Descendant Data: ', descendants);
	// const isInView = useInView()
	// const ref = useRef(null);
	// const isInView = useInView(ref, { once: true });
	const variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};
	const childVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};
	useEffect(() => {
		const fetchDescendants = async () => {
			const response = await fetch(`/api/metadata/get-descendants`, {
				method: 'GET',
				mode: 'same-origin',
				cache: 'default',
			});
			const data = await response.json();
			setDescendants(
				data.sort((a: Descendant, b: Descendant) =>
					a.descendant_group_id > b.descendant_group_id ? 1 : -1,
				) as DescendantList,
			);
		};
		fetchDescendants();
		setIsLoading(false);
	}, []);
	if (isLoading) {
		return <div className='p-4 text-center'></div>;
	}
	return descendants.length > 0 ? (
		<motion.section
			className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 p-4'
			variants={variants}
			initial='hidden'
			animate='visible'
			// ref={ref}
		>
			{descendants.map((item) => {
				return (
					<motion.figure
						key={item.descendant_id}
						className='descendant-box flex col-span-1 flex-col items-center justify-start gap-2'
						variants={childVariants}
					>
						<Link
							href={`/descendant/${item.descendant_name
								.toLowerCase()
								.replace(' ', '-')}`}
						>
							<Image
								src={item.descendant_image_url}
								width={100}
								height={100}
								alt={`Descendant ${item.descendant_name}`}
								className='rounded-4xl border-2 border-gray-700/25 dark:border-gray-300/25 w-full h-auto bg-gray-800/25 dark:bg-gray-300/5'
							/>
							<div className='grid grid-cols-5 gap-2 w-full'>
								{item.descendant_skill
									.sort((a, b) => {
										return (a.id ?? 0) > (b.id ?? 0) ? 1 : -1;
									})
									.map((skill) => {
										return (
											<Skill
												data={skill as DescendantSkill}
												key={skill.skill_name}
											/>
										);
									})}
							</div>
							<figcaption className='w-full text-center'>
								{item.descendant_name}
							</figcaption>
						</Link>
					</motion.figure>
				);
			})}
		</motion.section>
	) : (
		<div className='p-4 text-center'></div>
	);
}
