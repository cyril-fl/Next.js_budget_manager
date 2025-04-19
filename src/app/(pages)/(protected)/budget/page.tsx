import Pre from '@/.debug/components/Pre';
import Button from '@/components/global/Button';
import { utilsApi } from '@api/utils/utilsApi';
import { YearDataModel } from '@types';
import utilsDate from '@utils/utilsDate';

type Props = {
	searchParams: { month?: number; year?: number };
};

export default async function DashboardPage(props: Props) {
	// Data
	// TODO:   Mettre dans un State comme redux
	const searchParams = await props.searchParams;
	const year = await Number(searchParams?.year ?? 1994);
	const month = await Number(searchParams?.month ?? 0);

	const { get } = utilsApi();
	const { formatMonth } = utilsDate();

	const { data: sheetData } = await get<Array<YearDataModel>>('years', {
		filter: {
			fn: 'AND',
			args: {
				l: 'reportYear',
				r: year,
			},
		},
	});
	const { data: fluxData } = await get<Array<any>>('transactions', {
		filter: {
			fn: 'AND',
			args: [
				{
					l: 'year',
					r: year,
				},
				{
					l: 'month',
					r: month,
				},
			],
		},
	});

	const [sheet] = sheetData || [];

	console.log('sheetData', sheetData);
	// const incomes = (fluxData ?? []).filter(
	// 	(item: any) => item.type === 'income'
	// );
	// const outcomes = (fluxData ?? []).filter(
	// 	(item: any) => item.type === 'outcome'
	// );

	// Methods
	// Render
	return (
		<section className="grow bg-amber-100">
			<h1 className="text-2xl font-bold">{year}</h1>
			<Pre data={sheetData} />
			<ul className="bg-grayscale-200 space-x-2 rounded-lg p-1">
				{sheet.months.map((m, index) => (
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

			{/*<FluxTabler title="Incomes" list={incomes} />*/}
			{/*<FluxTabler title="Outcomes" list={outcomes} />*/}
		</section>
	);
}
