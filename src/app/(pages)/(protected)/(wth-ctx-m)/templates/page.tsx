import ViewStyleButton from '@/components/action/ViewStyleButton';
import Button from '@/components/global/Button';
import HeadMenuToolbar from '@/components/layout/submenu/HeadMenuToolbar';
import ListTemplates from '@/components/list/ListTemplates';
import { utilsIcons } from '@utils/utilsIcons';

export default function SavingsPage() {
	// Data
	const icons = utilsIcons();

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
			<HeadMenuToolbar
				title="Template"
				slots={{
					right: (
						<>
							<ViewStyleButton target="templates" />
							<Button
								label="Add"
								icon={icons.plus}
								to="/templates/add"
								size="sm"
								noLabel
								leading
								squared
							/>
						</>
					),
				}}
			/>

			<p>
				Mettre un bouton Creer dans le hedaer qui servira de menu
				contextuel{' '}
			</p>

			<ListTemplates data={data} />
		</>
	);
}
