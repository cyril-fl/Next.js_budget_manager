import CalendarCard from '@/components/cards/CalendarCard';
import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
import { utilsApi } from '@/lib/useApi';
import { LocalItem, options, target } from '@utils/frequentRequest/calendar';

export default async function DashboardPage() {
	// Data
	const pageTitle = 'Calendar';
	const { get } = utilsApi();

	const { data } = await get<Array<LocalItem>>(target, options);

	// Methods

	// Render
	// return (
	// 	<div className="box col-span-full col-start-1 row-span-full row-start-1 flex grow flex-col items-center justify-center p-4">
	// 		<Pre data={data} />
	// 	</div>
	// );
	// if (data?.length === 0) {
	// 	return (
	// 		<section className="box col-span-full col-start-1 row-span-full row-start-1 flex grow flex-col items-center justify-center p-4">
	// 			<h1>Dashboard</h1>
	// 			<p className="text-sm text-gray-500">No data available.</p>
	// 			<Button to="/templates/add" label="Create a template" color="primary" />
	// 		</section>
	// 	);
	// }
	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitle} />

			{data?.map((item, index) => <CalendarCard item={item} key={index} />)}
		</>
	);
}
