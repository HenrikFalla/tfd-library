import { GET } from '@/app/api/metadata/get-descendant/route';
import DescendantProfileCard from '@/components/descendant/profile-card';
import Skills from '@/components/descendant/skills';
import type { Descendant, DescendantSkill } from '@/types/descendant-list';
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
		<main className='grid grid-cols-12 gap-4 px-8'>
			<aside className='col-span-12 md:col-span-4'>
				<DescendantProfileCard
					name={descendant.descendant_name}
					imageUrl={descendant.descendant_image_url}
				/>
			</aside>
			<section className='col-span-12 md:col-span-8 pt-4'>
				<Skills skills={descendant.descendant_skill as DescendantSkill[]} />
			</section>
		</main>
	);
}
