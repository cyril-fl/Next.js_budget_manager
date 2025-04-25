// Imports
import Button from '@/components/global/Button';
import { usePathname, useSearchParams } from 'next/navigation';

// Define

export default function DashboardToolBar() {
	// Data
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = (tab: string) => ({
		...Object.fromEntries(searchParams.entries()),
		tab,
	});

	const Actions = [
		{
			label: 'Yearly resume',
			to: {
				pathname,
				query: params('yearly'),
			},
		},
		{
			label: 'Monthly resume',
			to: {
				pathname,
				query: params('monthly'),
			},
		},
	];

	// Methods

	// Render
	return Actions.map((action) => (
		<Button
			key={action.label}
			label={action.label}
			to={action.to}
			className="btn btn-primary"
		/>
	));
}
