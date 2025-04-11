'use client';

import { Flux } from '@/types';
import { useMemo } from 'react';

type IncomesTablerProps = {
	title?: string;
	list?: Flux[];
};

export default function FluxTabler(props: IncomesTablerProps) {
	const Title = useMemo(() => {
		return (
			props.title && (
				<h2 className="text-xl font-bold text-gray-900">{props.title}</h2>
			)
		);
	}, [props.title]);

	// Regrouper par catégorie
	const groupedByCategory = useMemo(() => {
		if (!props.list) return {};

		return props.list.reduce<Record<string, Flux[]>>((acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		}, {});
	}, [props.list]);

	return (
		<div className="box box-base space-y-4">
			{Title}
			{Object.entries(groupedByCategory).map(([category, items]) => {
				const total = items.reduce((sum, item) => sum + item.amount, 0);

				return (
					<div key={category}>
						<h3 className="font-semibold text-gray-700">
							{category} –{' '}
							<span className="text-sm text-gray-500">{total} €</span>
						</h3>
						<ul className="">
							{items.map((item, index) => (
								<li key={index} className={'text-sm text-gray-600'}>
									{item.name} – {item.amount} €
								</li>
							))}
						</ul>
					</div>
				);
			})}
		</div>
	);
}
