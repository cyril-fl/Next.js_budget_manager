// Imports
import { Select, SelectionGroup } from '@/components/ui/Select';
import { utilsIcons } from '@utils/utilsIcons';
import { usePathname, useSearchParams } from 'next/navigation';

// Define

export default function DashboardToolBar() {
	// Data
	const icons = utilsIcons();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = (tab: string) => ({
		...Object.fromEntries(searchParams.entries()),
		tab,
	});

	const SelectGroup: SelectionGroup<string> = {
		options: [
			{
				displayValue: 'Monthly',
				value: 'Month',
			},
			{
				displayValue: 'Yearly',
				value: 'Year',
			},
		],
	};
	// Methods
	// TODO: On change redirect to same path change querrys

	// Render
	return (
		<Select<string>
			// placeholder="Placeholder"
			options={SelectGroup}
			closeIcon={icons.chevronDownBold}
			openIcon={icons.chevronUpBold}
			className="justify-end"
			defaultValue={SelectGroup.options[0].value}
		/>
	);
}
