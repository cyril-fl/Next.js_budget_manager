import Pre from '@/.debug/components/Pre';
import { utilsApi } from '@/lib/useApi';
import { UnknownTransaction } from '@types';

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

	const { get } = utilsApi();
	const { data: fluxData } = await get<Array<UnknownTransaction>>('months', {
		filter: {
			fn: 'AND',
			args: [{ l: 'reportMonth', r: month }],
		},
	});

	return (
		<>
			<h1 className="text-2xl font-bold">{year}</h1>
			<Pre data={fluxData} />
		</>
	);
}
