import { useConsole } from '@/.debug/hooks/useConsole';
import Input from '@/components/form/Input';

export default async function Home() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const Console = useConsole();

	Console.log('test du hokk personnalisé');

	const response = await fetch('http://localhost:3000/api/hello_word', {
		method: 'GET',
	});
	const res = await response.json();
	return (
		<div>
			<Input label="A" icon="majesticons:academic-cap" trailing />
			<Input label="B" icon="majesticons:academic-cap" trailing />
			<Input label="C" icon="majesticons:academic-cap" leading />
		</div>
	);
}
