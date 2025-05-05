import {
	ApiResponse,
	utilsDecodeDeleteParams,
	utilsRefineData,
	utilsRefineDataBis,
} from '@/lib/useApi';
import db from '@/lib/useData';
import { DataRepository } from '@/lib/useData/factories/DataRepository';
import { ModelFactory } from '@/lib/useData/factories/ModelFactory';
import { UnknownTransaction } from '@/lib/useData/types';
import { NextRequest, NextResponse } from 'next/server';

// TODO: mettre des header et un cors ect
export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const params = Object.fromEntries(searchParams.entries());

		console.log('Transaction - GET: params', params);
		const transactions = await db.collection('transactions').find({}).toArray();
		const records = ModelFactory.createTransactionRecordList(
			transactions as unknown as Array<UnknownTransaction>
		);
		const data = new DataRepository(records);

		const refinedData = utilsRefineData(data.transactions, params);
		const refinedDataBis = utilsRefineDataBis(params);
		console.log('Transaction - GET: refinedDataBis', refinedDataBis);

		// console.log('data.transactions', data.transactions);
		// console.log('Transaction - GET: db', transactions);
		const res: ApiResponse = {
			data: refinedData,
			success: true,
			message: 'Transaction data retrieved successfully',
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

export async function DELETE(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const recordIDs = utilsDecodeDeleteParams(searchParams);

		// console.log('params', recordIDs);
		// data.delete(recordIDs);
		// console.log('data', data.transactions);

		const res: ApiResponse = {
			// data: data.transactions,
			data: { ok: true },
			success: true,
			message: 'Transaction data retrieved successfully',
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
