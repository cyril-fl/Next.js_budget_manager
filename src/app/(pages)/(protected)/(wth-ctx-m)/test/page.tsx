'use client';
// Imports
import Pre from '@/.debug/components/Pre';
import Button from '@/components/ui/Button';
import { DataRepository } from '@/factories/DataRepository';
import { utilsApi } from '@/lib/useApi';
import { UnknownTransaction } from '@types';
import { useEffect, useState } from 'react';

// Define

// export default async function TestPages() {
export default function TestPages() {
	// Data

	const [sheet, setSheet] = useState(new DataRepository());
	// Methods
	const { suppress, get } = utilsApi();

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

	const [data, setData] = useState<Array<Record<string, unknown>>>([]);

	useEffect(() => {
		const fetchData = async () => {
			return await get<Array<Record<string, unknown>>>('transactions', {});
		};

		fetchData()
			.then((res) => {
				console.log('res', res);
				setData(res.data ?? []);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

	function handleAddIncome() {
		setSheet((prev) => {
			const newRepo = new DataRepository([...prev.transactions]); // ou clone si possible
			newRepo.add(testIncome);
			return newRepo;
		});
	}

	async function handleDeleteIncome() {
		console.log('handleDeleteIncome');
		const res = await suppress('transactions', [
			'flux_0',
			'flux_1',
			'flux_99',
			'flux_5',
		]);

		console.log('res in front !', res);
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
				<Pre data={data} />
				{/*<Pre data={sheet} />*/}
			</div>

			{/*<Button label={'Add Income'} onClick={handleAddIncome} />*/}
			<Button label={'Delete Income'} onClick={handleDeleteIncome} />
			{/*<Button label={'Update Income'} onClick={handleUpdateIncome} />*/}
		</div>
	);
}
