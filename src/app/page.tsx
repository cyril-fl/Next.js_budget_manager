// Import
import Pre from '@/.debug/components/Pre';
import { SheetModel } from '@/model/Sheet';

export default async function Home() {
	const response = await fetch('http://localhost:3000/api/hello_word', {
		method: 'GET',
	});

	const res = await response.json();

	const sheet = new SheetModel(res.years);

	return (
		<div className={'flex'}>
			<Pre label="sheet" data={sheet} />
			<Pre label="data" data={res} />
		</div>
	);
}
