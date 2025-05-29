import { PrismaGlobalClient } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = PrismaGlobalClient;
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const name = searchParams.get('name') as string;
	const req = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	const data = await GetDescendant(req);
	return NextResponse.json(data);
}
async function GetDescendant(name: string) {
	const data = await prisma.descendant.findFirst({
		where: {
			descendant_name: name,
		},
		include: {
			descendant_skill: true,
			descendant_stats: {
				include: {
					stat_detail: true,
				},
			},
		},
	});
	return data;
}
