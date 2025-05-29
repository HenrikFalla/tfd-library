import { GET } from '@/app/api/metadata/get-descendant/route';
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
			{descendant.descendant_name.charAt(0).toUpperCase() +
				descendant.descendant_name.slice(1)}
		</div>
	);
}
