// Import
import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';

// Define
type Props = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Component
export default async function Page({ searchParams }: Props) {
	const params = await searchParams;
	const year = Number(params?.year);
	const month = Number(params?.month);

	if (isNaN(year) || isNaN(month)) {
		return <div>Invalid year or month</div>;
	}

	// id": "m-2025-0"
	const pageTitle = `Overview ${year}-${month}`;
	// const { get } = utilsApi();
	// const { data } = await get<Array<MonthDataModel>>('months', {
	// 	maxRecords: 1,
	// 	filter: {
	// 		fn: 'AND',
	// 		args: [
	// 			{ l: 'reportYear', r: year },
	// 			{ l: 'reportMonth', r: month },
	// 		],
	// 	},
	// });

	// const flatData = data?.[0];
	// const incomes = {
	// 	total: flatData?.totalIncome ?? 0,
	// 	category: 'Incomes',
	// 	transactions: flatData?.incomes ?? [],
	// };
	// const outcomes = {
	// 	total: flatData?.totalOutcome ?? 0,
	// 	category: 'Outcomes',
	// 	transactions: flatData?.outcomes ?? [],
	// };

	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitle} />

			<h2>Overview</h2>
		</>
	);
}
