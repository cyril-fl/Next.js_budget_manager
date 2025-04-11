// 'use client';
//
// // Imports
// // import { Flux } from '@/types';
// import { useMemo } from 'react';
//
// // Define
// type IncomesTablerProps = {
// 	// list?: Flux[];
// };
//
// export default function IncomesTabler(props: IncomesTablerProps) {
// 	// Data
//
// 	// Methods
//
// 	// Render
// 	const List = useMemo(() => {
// 		const formatedList = props.list?.reduce((acc, item) => {
// 			const { category, ...rest } = item;
// 			if (!acc[category]) {
// 				acc[category] = [];
// 			}
// 			acc[category].push(rest);
// 			return acc;
// 		}, {});
//
// 		console.log('formatedList', formatedList);
//
// 		return (
// 			props.list?.map((item, index) => (
// 				<li key={index}>
// 					{item.name} - {item.category} - {item.amount}
// 				</li>
// 			)) ?? []
// 		);
// 	}, [props.list]);
//
// 	return (
// 		<ul className="flex grow flex-col items-center justify-center p-4">
// 			{List}
// 		</ul>
// 	);
// }
