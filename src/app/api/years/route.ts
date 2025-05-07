import data from '@/lib_D/useData';
import { NextRequest, NextResponse } from 'next/server';
import { utilsRefineData } from '../../../../.deprecated/lib_D/useApi';
import { ApiResponse } from '../../../../.deprecated/lib_D/useApi/types';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const params = Object.fromEntries(searchParams.entries());
		const refinedData = utilsRefineData(data.years, params);

		const res: ApiResponse = {
			data: refinedData,
			success: true,
			message: 'Years data retrieved successfully',
		};

		return NextResponse.json(res, { status: 200 });
	} catch (error: unknown) {
		const res: ApiResponse = {
			success: false,
			message:
				error && typeof error === 'object' && 'message' in error
					? String((error as { message: unknown }).message)
					: 'Internal Server Error',
		};

		return NextResponse.json(res, { status: 500 });
	}
}
