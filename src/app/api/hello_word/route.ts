import { NextResponse } from 'next/server';
import data from  '@/fake_api/data.json'


export async function GET() {
	return NextResponse.json(data);
}
