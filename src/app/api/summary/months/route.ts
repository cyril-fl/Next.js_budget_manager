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
		const pipeline = utilsPipeline(params, {
			group: (v) => ({
				$group: {
					_id: {
						$concat: [{ $toString: '$year' }, '-', { $toString: '$month' }],
					},
					year: { $first: '$year' },
					month: { $first: '$month' },
					record: { $push: '$$ROOT' },
				},
			}),
			project: (v) => ({
				$project: {
					_id: 0,
					year: 1,
					month: 1,
					record: 1,
				},
			}),
		});

		const records = await db
			.collection('transactions')
			.aggregate(pipeline)
			.toArray();
		// TODO Passer les record dans une factory pour les transformer

		console.log('records', records);

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
