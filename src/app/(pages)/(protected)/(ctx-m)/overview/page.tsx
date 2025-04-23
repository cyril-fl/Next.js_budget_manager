import SummaryByCategory from '@/components/tabler/SummaryByCategory';
import { utilsApi } from '@/lib/useApi';
import { MonthDataModel } from '@types';

type Props = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: Props) {
	const params = await searchParams;
	const year = Number(params?.year);
	const month = Number(params?.month);

	if (isNaN(year) || isNaN(month)) {
		return <div>Invalid year or month</div>;
	}

	// id": "m-2025-0"
	const { get } = utilsApi();
	const { data } = await get<Array<MonthDataModel>>('months', {
		maxRecords: 1,
		filter: {
			fn: 'AND',
			args: [
				{ l: 'reportYear', r: year },
				{ l: 'reportMonth', r: month },
			],
		},
	});

	const flatData = data?.[0];
	const incomes = {
		total: flatData?.totalIncome ?? 0,
		category: 'Incomes',
		transactions: flatData?.incomes ?? [],
	};
	const outcomes = {
		total: flatData?.totalOutcome ?? 0,
		category: 'Outcomes',
		transactions: flatData?.outcomes ?? [],
	};

	return (
		<>
			<h1 className="col-span-full row-span-1 row-start-1 overflow-scroll text-2xl font-bold">
				{year}
			</h1>
			<SummaryByCategory data={incomes} />

			<SummaryByCategory data={outcomes} />
		</>
	);
}
