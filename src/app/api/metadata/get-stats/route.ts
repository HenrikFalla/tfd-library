import { PrismaGlobalClient } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const prisma = PrismaGlobalClient;

export async function GET() {
	const data = await GetStats();
	if (data.length > 0) {
		return NextResponse.json(data);
	} else {
		return NextResponse.json({ message: 'No data found' }, { status: 404 });
	}
}
async function GetStats() {
	const data = await prisma.stats.findMany();
	return data;
}
