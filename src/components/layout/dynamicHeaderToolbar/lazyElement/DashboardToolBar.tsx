// Imports
import Button from '@/components/global/Button';
import { usePathname, useSearchParams } from 'next/navigation';

// Define

export default function DashboardToolBar() {
	// Data
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Methods

	// Render

	const params = (tab: string) => ({
		...Object.fromEntries(searchParams.entries()),
		tab,
	});
	// TODO faire un MAP
	return (
		<>
			<Button
				label="Yearly resume"
				to={{
					pathname: '/dashboard',
					query: params('yearly'),
				}}
			/>
			<Button
				label="Monthly resume"
				to={{
					pathname: '/dashboard',
					query: params('monthly'),
				}}
			/>
			<Button
				label="Transaction resume"
				to={{
					pathname: '/dashboard',
					query: params('transaction'),
				}}
			/>
		</>
	);
}
