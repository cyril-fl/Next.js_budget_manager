import db from '@/server/db';
import {
	ApiResponse,
	utilsDecodeGetParams,
	utilsPipeline,
} from '@/server/utilsApi';
import { SummaryFactory } from '@/server/utilsData/factory';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const params = utilsDecodeGetParams(searchParams);
		const pipeline = utilsPipeline(
			params,
			{
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
						outcomes: {
							$filter: {
								input: '$record',
								as: 'item',
								cond: { $eq: ['$$item.type', 'outcome'] },
							},
						},
						incomes: {
							$filter: {
								input: '$record',
								as: 'item',
								cond: { $eq: ['$$item.type', 'income'] },
							},
						},
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
			data: SummaryFactory.monthly(records),
			success: true,
			message: 'Month data retrieved successfully',
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
