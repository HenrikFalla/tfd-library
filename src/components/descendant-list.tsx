'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function DescendantList() {
	const [descendants, setDescendants] = useState([]);
	useEffect(() => {
		const fetchDescendants = async () => {
			const response = await fetch(`/api/metadata/descendant-list`, {
				method: 'GET',
				mode: 'same-origin',
				cache: 'default',
			});
			const data = await response.json();
			setDescendants(data);
		};
		fetchDescendants();
	}, []);
	return (
		<div>
			{descendants.map((item) => {
				return (
					<div key={item.descendant_id}>
						<Image
							src={item.descendant_image_url}
							width={100}
							height={100}
							alt={item.descendant_name}
						/>
						{item.descendant_name}
					</div>
				);
			})}
		</div>
	);
}
