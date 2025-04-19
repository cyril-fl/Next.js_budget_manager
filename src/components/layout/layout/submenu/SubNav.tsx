'use client';

import Button from '@/components/global/Button';
// import { SheetYear } from '@/types';
import { utilsIcons } from '@utils/utilsIcons';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

function SelectYearNavMenu() {
	const icons = utilsIcons();
	const searchParams = useSearchParams();

	const year = searchParams.get('year');
	const month = searchParams.get('month');

	const [data, setData] = useState<any[]>([]); // Typage des données

	// useEffect(() => {
	// 	const { get } = utilsApi();
	//
	// 	async function fetchData() {
	// 		const response = await get<Array<any>>('years', {
	// 			fields: ['year'],
	// 		});
	// 		if (response.data) {
	// 			setData(response.data);
	// 		}
	// 	}
	//
	// 	fetchData();
	// }, []);

	return (
		<ul className="w-full space-y-2">
			{data?.map((item, index) => (
				<li key={index}>
					<Button
						label={String(item.year)}
						to={{
							pathname: '/budget',
							query: {
								year: item.year,
								month: month,
							},
						}}
					/>
				</li>
			))}
			<li>
				<Button
					icon={icons.plus}
					trailing
					to={{
						pathname: '/budget',
						query: {
							year: year,
							month: month,
						},
					}}
				/>
			</li>
		</ul>
	);
}

export default function SubNavMenu() {
	// Data
	const pathname = usePathname(); // "/budget"
	const lastSegment = pathname.split('/').filter(Boolean).pop(); // "budget"

	const Menu = useMemo(() => {
		switch (lastSegment) {
			case 'budget':
				return <SelectYearNavMenu />;
			default:
				return null;
		}
	}, [lastSegment]);

	return <div className="">{Menu}</div>;
}
