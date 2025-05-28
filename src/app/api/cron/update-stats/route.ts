import { PrismaGlobalClient } from '@/lib/prisma';
import { Stat } from '@/types/stats';
import { after } from 'next/server';

const prisma = PrismaGlobalClient;
const url = process.env.NEXT_PUBLIC_NEXON_STATS_LIST as string;
const api_key = process.env.NEXT_PUBLIC_NEXON_API_KEY as string;
export async function GET() {
	const response = new Response(
		JSON.stringify({
			message: 'Data processed successfully',
			timestamp: new Date().toISOString(),
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
	after(async () => {
		const dbStats = await GetStatsDB();
		const externalStats = await GetStatsExternal();
		for (const stat of externalStats) {
			console.log('Stat: ', stat);
			const match = dbStats.find((dbStat) => dbStat.stat_id === stat.stat_id);
			console.log('Match: ', match);
			if (match) {
				UpdateStat(match, stat);
			} else {
				CreateStat(stat);
			}
		}
	});

	return response;
}
async function CreateStat(externalStat: Stat) {
	const newStat = await prisma.stats.create({
		data: externalStat,
	});
	console.log('New stat: ', newStat);
	return 'success';
}
async function UpdateStat(dbStat: Stat, externalStat: Stat) {
	await prisma.stats.update({
		data: externalStat,
		where: {
			id: dbStat.id,
		},
	});
	return 'success';
}
async function GetStatsDB() {
	const res = await prisma.stats.findMany();
	return res as Stat[];
}
async function GetStatsExternal() {
	const res = await fetch(`${url}?api_key=${api_key}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	const data = await res.json();
	return data;
}
