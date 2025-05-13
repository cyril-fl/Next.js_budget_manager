// Import
import Pre from '@/.debug/components/Pre';
import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
import { utilsApi } from '@/server/utilsApi';
import { Category } from '@/server/utilsData/models';

// Define
type Props = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

interface LocalItem {
	year: number;
	month: number;
	incomesCategory: Category[];
	outcomesCategory: Category[];
	/* 	TODO: Ajouter :
					-  Total Income
					-  Total Outcome
					
	
* */
}

// Component
export default async function Page({ searchParams }: Props) {
	const params = await searchParams;
	const year = Number(params?.year);
	const month = Number(params?.month);

	if (isNaN(year) || isNaN(month)) {
		return <div>Invalid year or month</div>;
	}

	// Data
	const { get } = utilsApi();
	const pageTitle = `Overview`;
	const pageTitleB = `Overview ${year}-${month}`;

	const { data: rawData } = await get<Array<LocalItem>>('months', {
		filter: {
			$and: [{ year: { $eq: year } }, { month: { $eq: month } }],
		},
		// limit: 1,
	});

	const { incomesCategory, outcomesCategory } = rawData?.[0] ?? {}; // Methods

	// Render
	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitleB} />

			<div className="box col-span-4 row-span-7 overflow-y-scroll">
				{/* I18n*/}
				<h2 className="head-title-box">INCOMES</h2>
				{incomesCategory?.map((item, index) => (
					<div
						key={index}
						className="box col-span-4 row-span-2 overflow-hidden"
					>
						<h2 className="head-title-box">{item.name}</h2>
						<p>{item.amount}</p>
						{item.transactions.map((tx, index) => (
							<Pre key={index} data={tx} />
						))}
					</div>
				))}
			</div>

			<div className="box col-span-4 row-span-7 overflow-y-scroll">
				<h2 className="head-title-box">OUTCOMES</h2>
				{outcomesCategory?.map((item, index) => (
					<div key={index} className="box col-span-4 row-span-2">
						<h2 className="head-title-box">{item.name}</h2>
						<p>{item.amount}</p>
						{item.transactions.map((tx, index) => (
							<Pre key={index} data={tx} />
						))}
					</div>
				))}
			</div>

			<div className="box col-span-4 overflow-hidden">
				<h2 className="head-title-box">SPARE</h2>
			</div>
			<div className="box col-span-4 row-span-2 overflow-hidden">
				<h2 className="head-title-box">BUDGET</h2>
			</div>
			<div className="box col-span-4 row-span-2 overflow-hidden">
				<h2 className="head-title-box">MONTHLY</h2>
			</div>
			<div className="box col-span-4 row-span-2 overflow-hidden">
				<h2 className="head-title-box">QUICK EDIT</h2>
			</div>
		</>
	);
}
