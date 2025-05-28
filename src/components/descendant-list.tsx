'use client';
import type { Descendant, DescendantList } from '@/types/descendant-list';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function DescendantList() {
	const [descendants, setDescendants] = useState<DescendantList>([]);
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
	}, []);
	return (
		<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-8 xl:grid-cols-12 p-4'>
			{descendants.map((item) => {
				return (
					<figure
						key={item.descendant_id}
						className='flex col-span-1 flex-col items-center justify-start gap-2'
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
					</figure>
				);
			})}
		</div>
	);
}
