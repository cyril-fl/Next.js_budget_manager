import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
import ListSavings from '@/components/list/ListSavings';
import { utilsIcons } from '@utils/utilsIcons';

export default function SavingsPage() {
	// Data
	const pageTitle = 'Savings';
	const icons = utilsIcons();

	const emptyData: any[] = [];
	const savingsData = [
		{
			id: 1,
			name: 'Savings account 1',
			balance: 1000,
			createdAt: '2023-01-01',
			updatedAt: '2023-01-02',
			history: [],
		},
		{
			id: 2,
			name: 'Savings account 2',
			balance: 2000,
			createdAt: '2023-01-03',
			updatedAt: '2023-01-04',
			history: [],
		},
	];

	const data: any[] = savingsData;

	// Methods

	// Render
	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitle} />

			{/*			<D_HeadMenuToolbar
				title="Saving"
				slots={{
					right: (
						<>
							<ViewStyleButton target="savings" />
							<Button
								label="Add"
								icon={icons.plus}
								to="/savings/add"
								size="sm"
								noLabel
								leading
								squared
							/>
						</>
					),
				}}
			/>*/}
			<ListSavings data={data} />
		</>
	);
}
