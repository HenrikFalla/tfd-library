import { after } from 'next/server';
import { GET as UpdateDescendants } from '@/app/api/cron/update-descendants/route';
import { GET as UpdateWeapons } from '@/app/api/cron/update-weapons/route';

export async function GET() {
	const response = new Response(
		JSON.stringify({
			message: 'Data processing started successfully',
			timestamp: new Date().toISOString(),
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
	after(async () => {
		await UpdateDescendants();
		await UpdateWeapons();
		console.log(
			`Weapons and Descendants updated at ${new Date().toISOString()}`,
		);
	});
	return response;
}
