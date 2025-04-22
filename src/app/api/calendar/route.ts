import { ApiResponse } from '@/lib/useApi';
import data from '@/lib/useData/data';
import { NextRequest, NextResponse } from 'next/server';

// TODO: mettre des header et un cors ect
export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const params = Object.fromEntries(searchParams.entries());
		// const refinedData = utilsRefineData(data.months, params);

		const res: ApiResponse = {
			data: data.transactions,
			success: true,
			message: 'Index calendar data retrieved successfully',
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
