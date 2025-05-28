'use client';
import type { Descendant, DescendantList } from '@/types/descendant-list';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function DescendantList() {
	const [isLoading, setIsLoading] = useState(true);
	const [descendants, setDescendants] = useState<DescendantList>([]);
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
			className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-8 xl:grid-cols-12 p-4'
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
						<Image
							src={item.descendant_image_url}
							width={100}
							height={100}
							alt={`Descendant ${item.descendant_name}`}
							className='rounded-4xl border-2 border-gray-700/25 dark:border-gray-300/25 w-full h-auto'
						/>
						<figcaption className='w-full text-center'>
							{item.descendant_name}
						</figcaption>
					</motion.figure>
				);
			})}
		</motion.section>
	) : (
		<div className='p-4 text-center'></div>
	);
}
