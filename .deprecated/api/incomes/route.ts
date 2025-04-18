import { ApiResponse } from '@/types';
import { utilsRefineData } from '@utils/utilsApi';
import { NextRequest, NextResponse } from 'next/server';
import data from '../../../fake_api/data.json';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const params = Object.fromEntries(searchParams.entries());

	const rawData = data.years.flatMap((year) =>
		year.months.flatMap((month) =>
			month.income.flatMap((entry) => ({
				year: year.year,
				month: month.month,
				type: 'income',
				...entry,
			}))
		)
	);
	const refinedData = utilsRefineData(rawData, params);

	const res: ApiResponse = {
		message: 'Icome',
		success: true,
		data: refinedData,
	};
	return NextResponse.json(res, { status: 200 });
}
