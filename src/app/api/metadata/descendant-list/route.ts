import { NextResponse } from 'next/server';

export async function GET() {
	const url = process.env.NEXT_PUBLIC_NEXON_DESCENDANT_LIST as string;
	const api_key = process.env.NEXT_PUBLIC_NEXON_API_KEY as string;
	const response = await fetch(`${url}?api_key=${api_key}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	const data = await response.json();
	return NextResponse.json(data);
}
