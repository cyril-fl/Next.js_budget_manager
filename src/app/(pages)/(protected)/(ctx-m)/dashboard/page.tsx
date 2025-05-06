// // Import
// import Pre from '@/.debug/components/Pre';
// import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
// import { ApiOptions, ApiPathLabel, utilsApi } from '@/lib_D/useApi';
// import { target as calendar, options } from '@utils/frequentRequest/calendar';
// import { JSX } from 'react';
//
// // Define
// type Props = {
// 	searchParams: Record<string, string | string[] | undefined>;
// };
// interface SummaryProps {
// 	data?: Array<Record<string, unknown>>;
// }
// interface Map {
// 	target: ApiPathLabel;
// 	component: (props: SummaryProps) => JSX.Element;
// }
//
// // Component
// export default async function Page({ searchParams }: Props) {
// 	const pageTitle = 'Dashboard';
// 	const map: Record<string, Map> = {
// 		year: {
// 			target: 'yearlySummary',
// 			component: YearlySummary,
// 		},
// 		month: {
// 			target: 'monthlySummary',
// 			component: MonthlySummary,
// 		},
// 	};
//
// 	// Data
// 	const { get } = utilsApi();
// 	const params = await searchParams;
// 	const tab = params.tab as keyof typeof map | undefined;
// 	const target = tab ? map[tab].target : undefined;
//
// 	const { data } = await get<Array<Record<string, unknown>>>(target, {
// 		maxRecords: 1,
// 		...handleParams(),
// 	});
//
// 	// Methods
// 	function handleParams(): Partial<ApiOptions> | undefined {
// 		const toArray = (value: string | string[] | undefined) =>
// 			Array.isArray(value) ? value : value ? [value] : [];
//
// 		const tabParam = toArray(params.tab).join();
// 		const yearParam = toArray(params.year).join();
// 		const monthParam = toArray(params.month).join();
//
// 		const isMonth = tabParam === 'month';
// 		``;
// 		const args = [{ l: 'year', r: yearParam }];
// 		if (isMonth) args.push({ l: 'month', r: monthParam });
//
// 		if (args.length > 0) {
// 			return {
// 				filter: {
// 					fn: 'AND',
// 					args,
// 				},
// 			};
// 		}
//
// 		return params;
// 	}
//
// 	// Render
// 	const Component = tab ? map[tab].component : () => <div>No data</div>;
//
// 	return (
// 		<>
// 			<HeaderToolbar
// 				path={pageTitle.toLowerCase()}
// 				title={pageTitle}
// 				target={calendar}
// 				option={options}
// 			/>
// 			<div className="box col-span-full row-span-full row-start-2">
// 				<Component data={data} />
// 			</div>
// 		</>
// 	);
// }
//
// function YearlySummary({ data }: SummaryProps) {
// 	return (
// 		<div>
// 			<h2>YearlySummary</h2>
// 			<Pre label={String(data?.length)} data={data} />
// 		</div>
// 	);
// }
//
// function MonthlySummary({ data }: SummaryProps) {
// 	return (
// 		<div>
// 			<h2>MonthlySummary</h2>
// 			<Pre label={String(data?.length)} data={data} />
// 		</div>
// 	);
// }
