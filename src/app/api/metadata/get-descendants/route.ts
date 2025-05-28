import { PrismaGlobalClient } from '@/lib/prisma';
import { NextResponse } from 'next/server';
const prisma = PrismaGlobalClient;

export async function GET() {
	const dataDB = await GetDescendantsDB();
	if (dataDB.length > 0) {
		return NextResponse.json(dataDB);
	} else {
		return NextResponse.json('No data found');
	}
}

async function GetDescendantsDB() {
	const response = await prisma.descendant.findMany();
	return response;
}
