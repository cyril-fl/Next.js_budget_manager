// Imports
import { Select, SelectionGroup } from '@/components/ui/Select';
import { utilsIcons } from '@utils/utilsIcons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Define

export default function DashboardToolBar() {
	// Data
	const icons = utilsIcons();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const SelectGroup: SelectionGroup<string> = {
		options: [
			{
				displayValue: 'Yearly',
				value: 'year',
			},
			{
				displayValue: 'Monthly',
				value: 'month',
			},
		],
	};

	// Methods
	function encodeUrlParams(tab: string) {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set('tab', tab);
		return newParams.toString();
	}
	function handleChange(value: string) {
		router.push(`${pathname}?${encodeUrlParams(value)}`);
	}

	// Render
	return (
		<>
			<Select<string>
				options={SelectGroup}
				closeIcon={icons.chevronDownBold}
				openIcon={icons.chevronUpBold}
				className="justify-end"
				defaultValue={searchParams.get('tab') ?? SelectGroup.options[0].value}
				onChange={handleChange}
			/>
		</>
	);
}
