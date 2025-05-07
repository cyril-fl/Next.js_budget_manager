import { groupBy } from '@/app/api/summary/years/utils';
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
		// const pipeline = utilsPipeline(params);
		const pipeline = utilsPipeline(
			params,
			{
				group: (v) => groupBy,
				project: (v) => ({
					$project: {
						_id: 0,
						year: 1,
						month: {
							$setUnion: [
								{
									$reduce: {
										input: '$record',
										initialValue: [],
										in: {
											$concatArrays: ['$$value', ['$$this.month']],
										},
									},
								},
							],
						},
						transactionCount: {
							$size: '$record',
						},

						incomes: {
							$map: {
								input: {
									$filter: {
										input: '$record',
										as: 'day',
										cond: { $eq: ['$$day.type', 'income'] },
									},
								},
								as: 'item',
								in: {
									_id: '$$item._id',
									label: '$$item.label',
									category: '$$item.category',
									currency: '$$item.currency',
									amount: '$$item.amount',
									type: '$$item.type',
									month: '$$item.month',
									status: '$$item.status',
									dayReception: '$$item.dayReception',
								},
							},
						},
						outcomes: {
							$map: {
								input: {
									$filter: {
										input: '$record',
										as: 'day',
										cond: { $eq: ['$$day.type', 'outcome'] },
									},
								},
								as: 'item',
								in: {
									_id: '$$item._id',
									label: '$$item.label',
									category: '$$item.category',
									currency: '$$item.currency',
									amount: '$$item.amount',
									type: '$$item.type',
									month: '$$item.month',
									status: '$$item.status',
									dayReception: '$$item.dayReception',
								},
							},
						},
					},
				}),
			},
			['filter', 'group', 'project', 'offset', 'limit', 'fields', 'sort']
		);

		console.log('pipeline', pipeline);
		const records = await db
			.collection('transactions')
			.aggregate(pipeline)
			.toArray();

		console.log('records', records);
		const res: ApiResponse = {
			// data: records,
			data: SummaryFactory.yearly(records),
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
