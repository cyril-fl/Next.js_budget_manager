'use client';

import { useConsole } from '@/.debug/hooks/useConsole';

export default function Home() {
	const Console = useConsole();

	Console.log('test du hokk personnalisé');
	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		console.log('click trigger from parent');
	}
	// const response = await fetch('http://localhost:3000/api/hello_word', {
	// 	method: 'GET',
	// });
	//
	// const res = await response.json();
	return <div></div>;
}
