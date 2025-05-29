import { GET } from '@/app/api/metadata/get-descendant/route';
import DescendantProfileCard from '@/components/descendant/profile-card';
import type { Descendant } from '@/types/descendant-list';
import { NextRequest } from 'next/server';

export default async function Descendant({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const request = new NextRequest(
		`http://localhost:3000/api/metadata/get-descendant?name=${slug}`,
	);
	const response = await GET(request);
	const descendant = (await response.json()) as Descendant;
	return (
		<div>
			<DescendantProfileCard
				name={descendant.descendant_name}
				imageUrl={descendant.descendant_image_url}
			/>
		</div>
	);
}
