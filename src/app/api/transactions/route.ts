// Import
import { ApiResponse, utilsDecodeGetParams } from '@/server/utilsApi';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const params = utilsDecodeGetParams(searchParams);
		console.log('params', params);
		// console.log('params', decodedParams);
		// const records = await db
		// 	.collection('transactions')
		// 	.aggregate(decodedParams)
		// 	.toArray();

		const res: ApiResponse = {
			// data: records,
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

export async function DELETE(req: NextRequest) {
	console.log('DELETE transactions');
	try {
		const searchParams = req.nextUrl.searchParams;
		// const recordIDs = utilsDecodeDeleteParams(searchParams);

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
