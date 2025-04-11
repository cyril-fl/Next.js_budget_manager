import { utilsApi } from '@utils/utilsApi';

export default async function DashboardPage() {
	// Data
	const { get } = utilsApi();

	const res = await get('years', {
		filter: {
			fn: 'AND',
			args: { l: 'years', r: '2022' },
		},
	});
	// Methods

	// Render
	return (
		<section className="flex grow flex-col items-center justify-center p-4">
			<h1>Dashboard</h1>
			{/*<Pre label="Data" data={res}></Pre>*/}
		</section>
	);
}
