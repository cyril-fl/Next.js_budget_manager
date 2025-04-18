import { ApiResponse } from '@/types';
import { utilsRefineData } from '@utils/utilsApi';
import { NextRequest, NextResponse } from 'next/server';
import data from '../../../fake_api/data.json';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const params = Object.fromEntries(searchParams.entries());

	const rawData = data.years.flatMap((year) =>
		year.months.flatMap((month) =>
			(['income', 'outcome'] as const).flatMap(
				(type) =>
					month[type]?.flatMap((entry) =>
						entry.flux.map((fluxItem) => ({
							type,
							year: year.year,
							month: month.month,
							category: entry.category,
							parent_id: entry.id,
							...fluxItem,
						}))
					) || []
			)
		)
	);

	const refinedData = utilsRefineData(rawData, params);

	const res: ApiResponse = {
		data: refinedData,
		success: true,
		message: 'Test data fetching',
	};
	return NextResponse.json(res, { status: 200 });
}
