import db from '@/server/db';
import {
	ApiResponse,
	utilsDecodeGetParams,
	utilsPipeline,
} from '@/server/utilsApi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		// const searchParams = req.nextUrl.searchParams;
		// const params = Object.fromEntries(searchParams.entries());
		// const refinedData = utilsRefineData(data.years, params);
		//
		// const res: ApiResponse = {
		// 	data: refinedData,
		// 	success: true,
		// };
		//
		// return NextResponse.json(res, { status: 200 });

		const searchParams = req.nextUrl.searchParams;
		const params = utilsDecodeGetParams(searchParams);
		// const pipeline = utilsPipeline(params, {
		// 	group: (v) => ({
		// 		$group: {
		// 			_id: '$year',
		// 			total: { $sum: '$amount' },
		// 			record: { $push: '$$ROOT' },
		// 		},
		// 	}),
		// });

		const pipeline = utilsPipeline(params);
		const records = await db
			.collection('transactions')
			.aggregate(pipeline)
			.toArray();

		const res: ApiResponse = {
			data: records,
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
