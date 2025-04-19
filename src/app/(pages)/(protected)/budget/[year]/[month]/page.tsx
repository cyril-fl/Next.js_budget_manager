import Button from '@/components/global/Button';
import FluxTabler from '@/components/tabler/FluxTabler';
import { Flux, SheetYear } from '@/types';
import { utilsApi } from '@utils/d_utilsApi';
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

	const { data: sheetData } = await get<Array<SheetYear>>('years', {
		filter: {
			fn: 'AND',
			args: {
				l: 'year',
				r: year,
			},
		},
	});
	const { data: fluxData } = await get<Array<Flux>>('flux', {
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

	const incomes = (fluxData ?? []).filter(
		(item: Flux) => item.type === 'income'
	);
	const outcomes = (fluxData ?? []).filter(
		(item: Flux) => item.type === 'outcome'
	);

	// Methods
	// Render
	return (
		<section className="grow bg-amber-100">
			<h1 className="text-2xl font-bold">{year}</h1>
			<ul className="bg-grayscale-200 space-x-2 rounded-lg p-1">
				{sheet.months.map((m, index) => (
					<li key={index} className="inline">
						<Button
							label={formatMonth(year, m.month, {
								month: 'long',
							})}
							to={{
								pathname: '/budget',
								query: {
									year: sheet.year,
									month: m.month,
								},
							}}
							variant={m.month === month ? 'solid' : 'ghost'}
						/>
					</li>
				))}
			</ul>

			<FluxTabler title="Incomes" list={incomes} />
			<FluxTabler title="Outcomes" list={outcomes} />
		</section>
	);
}
