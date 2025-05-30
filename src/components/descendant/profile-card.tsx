'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function DescendantProfileCard(props: {
	name: string;
	imageUrl: string;
}) {
	const { name, imageUrl } = props;
	const [source, setSource] = useState(
		`https://rtbjosjluuakkrjx.public.blob.vercel-storage.com/descendants/${name.replace(
			' ',
			'',
		)}.png`,
	);

	return (
		<div>
			<h1>{name}</h1>
			<Image
				src={source}
				alt=''
				width={500}
				height={500}
				onError={() => setSource(imageUrl)}
			/>
		</div>
	);
}
