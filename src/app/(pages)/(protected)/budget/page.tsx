import Pre from '@/.debug/components/Pre';
import Button from '@/components/global/Button';
import { utilsApi } from '@/lib/useApi';
import { UnknownTransaction } from '@types';
import utilsDate from '@utils/utilsDate';

type Props = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: Props) {
	const params = await searchParams;
	const year = Number(params?.year ?? '1994');
	const month = Number(params?.month ?? '0');

	const { get } = utilsApi();
	const { formatMonth } = utilsDate();

	// const { data: sheetData } = await get<Array<YearDataModel>>('years', {
	// 	fields: ['reportYear', 'months'],
	// 	filter: {
	// 		fn: 'AND',
	// 		args: {
	// 			l: 'reportYear',
	// 			r: year,
	// 		},
	// 	},
	// });

	const { data: sheetData } = await get<Array<any>>('transactions', {
		fields: ['reportYear', 'reportMonth'],
		filter: {
			fn: 'GROUP_BY',
			args: [
				{
					l: 'reportYear',
				},
				{
					l: 'reportMonth',
				},
				{
					fn: 'AND',
					args: [
						{
							l: 'reportYear',
							r: year,
						},
						// {
						// 	l: 'reportMonth',
						// 	r: month,
						// },
					],
				},
			],
		},
		// TODO probleme sur le Sort avec 0 1 10 11 2 3 4 5 6 7 8 9
		sort: [
			{
				field: 'reportYear',
			},
			{
				field: 'reportMonth',
			},
		],
	});

	// TODO probleme ici quand je cherche un Month,Il ne sont pas fuse !
	const { data: fluxData } = await get<Array<UnknownTransaction>>('months', {
		filter: {
			fn: 'AND',
			args: [
				{ l: 'reportYear', r: year },
				{ l: 'reportMonth', r: month },
			],
		},
	});

	const [sheet] = sheetData || [];

	return (
		<section className="grow bg-amber-100">
			<h1 className="text-2xl font-bold">{year}</h1>
			{/*<Pre label={String(sheetData?.length)} data={sheetData} />*/}
			<Pre data={fluxData} />
			<ul className="bg-grayscale-200 space-x-2 rounded-lg p-1">
				{sheetData?.map((m, index) => (
					<li key={index} className="inline">
						<Button
							label={formatMonth(year, m.reportMonth, {
								month: 'long',
							})}
							to={{
								pathname: '/budget',
								query: {
									year: sheet.reportYear,
									month: m.reportMonth,
								},
							}}
							variant={m.reportMonth === month ? 'solid' : 'ghost'}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
