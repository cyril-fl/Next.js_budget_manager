// Import
import Pre from '@/.debug/components/Pre';
import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
import { ApiEncodedParams, ApiEndpoint, utilsApi } from '@/server/utilsApi';
import { target as calendar, options } from '@utils/frequentRequest/calendar';
import { JSX } from 'react';

// Define
type Props = {
	searchParams: Record<string, string | string[] | undefined>;
};
interface SummaryProps {
	data?: Array<Record<string, unknown>>;
}
interface Map {
	target: ApiEndpoint;
	component: (props: SummaryProps) => JSX.Element;
}

// Component
export default async function Page({ searchParams }: Props) {
	const pageTitle = 'Dashboard';
	const map: Record<string, Map> = {
		year: {
			target: 'yearlySummary',
			component: YearlySummary,
		},
		month: {
			target: 'monthlySummary',
			component: MonthlySummary,
		},
	};

	// Data
	const { get } = utilsApi();
	const params = await searchParams;
	const tab = params.tab as keyof typeof map | undefined;
	const target = tab ? map[tab].target : undefined;

	const { data } = await get<Array<Record<string, unknown>>>(target, {
		...handleParams(),
	});

	// Methods
	function handleParams(): Partial<ApiEncodedParams> | undefined {
		const extract = (param: string | string[] | undefined) => {
			if (Array.isArray(param)) return param.map((item) => item);
			return param ? [param] : [];
		};

		const [paramYear] = extract(params.year);
		const [paramMonth] = extract(params.month);
		const [paramTab] = extract(params.tab);

		const isMonth = paramTab === 'month';

		const year = Number(paramYear);
		const month = Number(paramMonth);

		if (isNaN(year)) return undefined;

		const filter: Record<string, any>[] = [{ year: { $eq: year } }];
		if (isMonth && !isNaN(month)) filter.push({ month: { $eq: month } });

		return { filter: { $and: filter } };
	}

	// Render
	const Component = tab ? map[tab].component : () => <div>No data</div>;

	return (
		<>
			<HeaderToolbar
				path={pageTitle.toLowerCase()}
				title={pageTitle}
				target={calendar}
				option={options}
			/>
			<div className="box col-span-full row-span-full row-start-2">
				<Component data={data} />
			</div>
		</>
	);
}

function YearlySummary({ data }: SummaryProps) {
	return (
		<div>
			<h2>YearlySummary</h2>
			<Pre label={String(data?.length)} data={data} />
		</div>
	);
}

function MonthlySummary({ data }: SummaryProps) {
	return (
		<div>
			<h2>MonthlySummary</h2>
			<Pre label={String(data?.length)} data={data} />
		</div>
	);
}
