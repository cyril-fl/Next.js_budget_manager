import { ApiResponse, Flux } from '@/types';
import { apiDecodeParams } from '@api/apiDecodeParams';
import { NextRequest, NextResponse } from 'next/server';
import data from '../../../.lib/data';

// TODO: mettre des header et un cors ect
export async function GET(req: NextRequest) {
	const { refineData } = apiDecodeParams();

	const searchParams = req.nextUrl.searchParams;
	const params = Object.fromEntries(searchParams.entries());
	const refinedData = refineData<Flux>(data.records, params);
	// console.log('refinedData', refinedData);

	const res: ApiResponse = {
		data: refinedData,
		success: true,
		message: 'Flux data retrieved successfully',
	};
	return NextResponse.json(res, { status: 200 });
}
