import Button from '@/components/global/Button';
import { utilsIcons } from '@utils/utilsIcons';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function SelectYearNavMenu() {
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
