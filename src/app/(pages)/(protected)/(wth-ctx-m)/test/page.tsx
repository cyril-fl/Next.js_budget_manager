// Imports
import { Select } from '@/components/global/Select';
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
		<section className="">
			{/*<Disclosure*/}
			{/*	label="Test"*/}
			{/*	triggerProps={{*/}
			{/*		variant: 'nude',*/}
			{/*		squared: true,*/}
			{/*	}}*/}
			{/*>*/}
			{/*	<div className="flex flex-col gap-2">*/}
			{/*		<p className="Text">Test</p>*/}
			{/*		<p className="Text">Test</p>*/}
			{/*		<p className="Text">Test</p>*/}
			{/*	</div>*/}
			{/*</Disclosure>*/}

			<Select placeholder="Select value" />
			{/*<Pre label={String(response?.data?.length)} data={response?.data} />*/}
		</section>
	);
}
