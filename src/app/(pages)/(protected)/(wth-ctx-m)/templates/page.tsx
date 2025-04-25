// import ViewStyleButton from '@/components/action/ViewStyleButton';
// import Button from '@/components/global/Button';

import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';

export default function SavingsPage() {
	// Data
	const pageTitle = 'Templates';

	const emptyData: any[] = [];
	const savingsData = [
		{
			id: 1,
			name: 'Template 1',
		},
		{
			id: 2,
			name: 'Template 2',
		},
	];

	const data: any[] = savingsData;

	// Methods

	// Render
	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitle} />

			<p>
				Mettre un bouton Creer dans le hedaer qui servira de menu
				contextuel{' '}
			</p>

			{/*<ListTemplates data={data} />*/}
		</>
	);
}
