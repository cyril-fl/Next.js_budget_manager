// Imports
import Pre from '@/.debug/components/Pre';
import { utilsApi } from '@/lib/useApi';

// Define

export default async function TestPages() {
	// Data

	// Methods
	const { get } = utilsApi();

	const response = await get<Array<Record<string, unknown>>>('transactions', {
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
			],
		},
		sort: [{ field: 'reportYear' }, { field: 'reportMonth' }],
	});

	// Render
	return (
		<section className="box col-span-full row-span-full row-start-1">
			<Pre label={String(response?.data?.length)} data={response?.data} />
		</section>
	);
}
