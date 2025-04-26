import Pre from '@/.debug/components/Pre';
import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
import { ApiPathLabel, utilsApi } from '@/lib/useApi';
import { redirect } from 'next/navigation';
import { JSX } from 'react';

type Props = {
	searchParams: Record<string, string | string[] | undefined>;
};

interface SummaryProps {
	data?: Array<Record<string, unknown>>;
}
interface Map {
	target: ApiPathLabel;
	component: (props: SummaryProps) => JSX.Element;
}

export default async function Page({ searchParams }: Props) {
	const pageTitle = 'Dashboard';
	if (!searchParams.tab)
		return redirect(`/${pageTitle.toLowerCase()}?tab=year`);

	// Data
	const { get } = utilsApi();

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

	const tab = searchParams.tab as keyof typeof map;
	const target = map[tab].target ?? 'yearlySummary';
	const Component = map[tab].component ?? (() => <div>No data</div>);

	const { data } = await get<Array<Record<string, unknown>>>(target, {});

	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitle} />
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
