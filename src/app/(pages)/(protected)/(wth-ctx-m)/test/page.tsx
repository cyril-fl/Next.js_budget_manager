// Imports
import Pre from '@/.debug/components/Pre';
import { ApiFormula, utilsApi } from '@/lib_D/useApi';

// Define

export default async function TestPages() {
	// Data
	const filter: ApiFormula = {
		fn: 'AND',
		args: [
			{
				l: 'year',
				r: 2025,
			},
			{
				l: 'month',
				r: 0,
			},
			{
				l: 'type',
				r: 'income',
			},
		],
	};

	const { get } = utilsApi();

	const { data } = await get<object>('transactions', {
		filter,
		// maxRecords: 4,
		// offset: 1,
		// fields: ['label', 'amount'],
		// sort: [
		// 	{
		// 		field: 'amount',
		// 		direction: 'asc',
		// 	},
		// 	{
		// 		field: 'label',
		// 		direction: 'asc',
		// 	},
		// ],
	});

	// Render
	return (
		<div>
			<div className={'flex gap-4 p-4'}>
				<h1>Test</h1>
				<Pre data={data} />
			</div>
		</div>
	);
}

/*	const [sheet, setSheet] = useState(new DataRepository());
// Methods

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
	const res = await suppress('transactions', ['inc_0', 'inc_1']);

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
}*/
/*
<Button label={'Add Income'} onClick={handleAddIncome} />
<Button label={'Delete Income'} onClick={handleDeleteIncome} />
<Button label={'Update Income'} onClick={handleUpdateIncome} />
*/
