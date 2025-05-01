'use client';
// Imports
import Pre from '@/.debug/components/Pre';
import Button from '@/components/ui/Button';
import { DataRepository } from '@/factories/DataRepository';
import { UnknownTransaction } from '@types';
import { useState } from 'react';

// Define

// export default async function TestPages() {
export default function TestPages() {
	// Data

	const [sheet, setSheet] = useState(new DataRepository());
	// Methods
	// const { get } = utilsApi();

	const testIncome: Omit<UnknownTransaction, 'id'> = {
		label: 'income_0',
		category: 'Salaire',
		currency: 'EUR',
		amount: 2660.38,
		type: 'income',
		month: 0,
		year: 2024,
		status: 'expected',
		dayReception: 16,
	};

	/*	const response = await get<Array<Record<string, unknown>>>('calendar', {
		// maxRecords: 1,
		// fields: [
		// 	'transactionByMonth',
		// 	'incomeTransactionByMonth',
		// 	'outcomeTransactionByMonth',
		// ],
	});*/
	//

	function handleAddIncome() {
		setSheet((prev) => {
			const newRepo = new DataRepository([...prev.transactions]); // ou clone si possible
			newRepo.add(testIncome);
			return newRepo;
		});
	}

	function handleDeleteIncome() {
		setSheet((prev) => {
			const newRepo = new DataRepository([...prev.transactions]); // ou clone si possible
			newRepo.delete('INC-SAL-2024-0');
			return newRepo;
		});
	}

	function handleUpdateIncome() {
		setSheet((prev) => {
			const newRepo = new DataRepository([...prev.transactions]);

			console.log('newRepo', newRepo);

			const patch = {
				id: 'INC-SAL-2024-0',
				patch: {
					...testIncome,
					id: 'kjbkjb',
					label: 'income_10000',
				},
			};

			newRepo.update(patch);
			console.log('newRepo updated', newRepo);
			return newRepo;
		});
	}

	// Render
	return (
		<div>
			<div className={'flex gap-4 p-4'}>
				<Pre data={testIncome} />
				<Pre data={sheet} />
			</div>

			<Button label={'Add Income'} onClick={handleAddIncome} />
			<Button label={'Delete Income'} onClick={handleDeleteIncome} />
			<Button label={'Update Income'} onClick={handleUpdateIncome} />
		</div>
	);
}
