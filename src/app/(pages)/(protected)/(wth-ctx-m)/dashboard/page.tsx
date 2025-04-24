import Pre from '@/.debug/components/Pre';
import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
import { ApiPathLabel, utilsApi } from '@/lib/useApi';

type Props = {
	searchParams: Record<string, string | string[] | undefined>;
};

export default async function Page({ searchParams }: Props) {
	const pageTitle = 'Dashboard';
	const { get } = utilsApi();

	const map: Record<string, ApiPathLabel> = {
		yearly: 'yearlySummary',
		monthly: 'monthlySummary',
		transaction: 'transactions',
	};

	const tab = searchParams.tab as keyof typeof map;
	const target = map[tab] ?? 'yearlySummary';

	const { data } = await get<Array<Record<string, unknown>>>(target, {});

	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitle} />
			<div className="box col-span-full row-span-full row-start-2">
				<Pre data={searchParams} />
				<Pre label={String(data?.length)} data={data} />
			</div>
		</>
	);
}
