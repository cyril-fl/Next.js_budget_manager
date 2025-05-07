import { days, groupBy, months } from '@/app/api/calendar/utils';
import db from '@/server/db';
import {
	ApiResponse,
	utilsDecodeGetParams,
	utilsPipeline,
} from '@/server/utilsApi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const params = utilsDecodeGetParams(searchParams);
		const pipeline = utilsPipeline(
			params,
			{
				group: (v) => groupBy,
				project: () => ({
					$project: {
						_id: 0,
						year: 1,
						months,
						days,
					},
				}),
			},
			['filter', 'group', 'project', 'offset', 'limit', 'fields', 'sort']
		);

		const records = await db
			.collection('transactions')
			.aggregate(pipeline)
			.toArray();

		const res: ApiResponse = {
			data: records,
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
