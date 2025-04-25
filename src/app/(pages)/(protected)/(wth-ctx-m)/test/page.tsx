// Imports
import { utilsApi } from '@/lib/useApi';

// Define

export default async function TestPages() {
	// Data

	// Methods
	const { get } = utilsApi();

	const response = await get<Array<Record<string, unknown>>>('monthlySummary', {
		maxRecords: 1,
		// fields: [
		// 	'transactionByMonth',
		// 	'incomeTransactionByMonth',
		// 	'outcomeTransactionByMonth',
		// ],
	});

	// Render
	return (
		<>
			<h2>Test</h2>
		</>
	);
}
