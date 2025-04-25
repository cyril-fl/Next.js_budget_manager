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
	};

	const search = await searchParams;
	const tab = search.tab as keyof typeof map;
	const target = map[tab] ?? 'yearlySummary';

	const { data } = await get<Array<Record<string, unknown>>>(target, {});

	return (
		<>
			<h2>Dashboard</h2>
		</>
	);
}
