import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
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
	const pageTitle = `Overview ${year}-${month}`;
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
			{/*<D_HeadMenuToolbar title={String(year)} />*/}
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitle} />

			<SummaryByCategory data={incomes} />

			<SummaryByCategory data={outcomes} />
		</>
	);
}
