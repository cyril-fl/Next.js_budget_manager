// Import
import Pre from '@/.debug/components/Pre';
import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
import { utilsApi } from '@/server/utilsApi';

// Define
type Props = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

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

	const { data } = await get<Array<Record<string, unknown>>>('months', {
		filter: {
			$and: [{ year: { $eq: year } }, { month: { $eq: month } }],
		},
		// limit: 1,
	});

	// Methods

	// Render
	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitleB} />
			<div className="col-span-full overflow-hidden">
				<h2>Overview</h2>
				<Pre data={data} />
			</div>
		</>
	);
}
