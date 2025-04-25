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

	// const SelectGroup: SelectionGroup<number> = {
	// 	label: 'Monthly Summary',
	// 	options: [
	// 		{
	// 			displayValue: 'January',
	// 			value: 1200,
	// 		},
	// 		{
	// 			displayValue: 'February',
	// 			value: 1500,
	// 		},
	// 		{
	// 			displayValue: 'March',
	// 			value: 800,
	// 		},
	// 	],
	// };

	// Render
	return <div></div>;
}
