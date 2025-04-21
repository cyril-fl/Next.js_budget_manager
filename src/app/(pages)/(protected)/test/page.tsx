// Imports
import Pre from '@/.debug/components/Pre';
import { utilsApi } from '@api/utils/utilsApi';

// Define

export default async function TestPages() {
	// Data

	// Methods
	const { get } = utilsApi();

	const response = await get<Array<Record<string, unknown>>>('months', {
		filter: {
			// fn: 'AND',
			fn: 'GROUP_BY',
			args: {
				l: 'reportYear',
			},
		},
	});

	// Render
	return (
		<section className="box col-span-full row-span-full row-start-1">
			<Pre label={String(response?.data?.length)} data={response?.data} />
		</section>
	);
}
