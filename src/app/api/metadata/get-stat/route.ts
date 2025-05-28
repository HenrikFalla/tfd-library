import { PrismaGlobalClient } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = PrismaGlobalClient;
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams.get('stat_id');
	if (!searchParams) {
		return NextResponse.json({ error: 'stat_id is required' });
	}
	const data = await prisma.stats.findMany({
		where: {
			stat_id: searchParams,
		},
	});
	return NextResponse.json(data);
}
