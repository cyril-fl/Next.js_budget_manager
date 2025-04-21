import { ApiResponse } from '@/types';
import { apiDecodeParams } from '@api/utils/apiDecodeParams';
import { NextRequest, NextResponse } from 'next/server';
import data from '../../../api/data';

// TODO: mettre des header et un cors ect
// TODO: mettre try and catch au autre route
export async function GET(req: NextRequest) {
	const { refineData } = apiDecodeParams();

	try {
		const searchParams = req.nextUrl.searchParams;
		const params = Object.fromEntries(searchParams.entries());
		const refinedData = refineData<any>(data.years, params);

		const res: ApiResponse = {
			data: refinedData,
			success: true,
			message: 'Flux data retrieved successfully',
		};

		return NextResponse.json(res, { status: 200 });
	} catch (error: any) {
		const res: ApiResponse = {
			success: false,
			message: error?.message || 'Internal Server Error',
		};

		return NextResponse.json(res, { status: 500 });
	}
}
