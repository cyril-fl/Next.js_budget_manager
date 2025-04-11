'use client';

// Imports

// Define
import { useMemo } from 'react';

type OutcomesTablerProps = {
	list?: any[];
};

export default function OutcomesTabler(props: OutcomesTablerProps) {
	// Data

	// Methods

	// Render
	const List = useMemo(() => {
		return (
			props.list?.map((item, index) => (
				<li key={index}>
					{item.name} - {item.category} - {item.amount}
				</li>
			)) ?? []
		);
	}, [props.list]);

	return (
		<ul className="flex grow flex-col items-center justify-center p-4">
			{List}
		</ul>
	);
}
