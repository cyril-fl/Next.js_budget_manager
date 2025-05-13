// Imports
import { SelectionGroup } from '@/components/ui/Select';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Toolbar } from 'radix-ui';

export default function DashboardToolBar() {
	// Data
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = Object.fromEntries(searchParams.entries());

	const tab = searchParams.get('tab') ?? 'year';

	const SelectGroup: SelectionGroup<string> = {
		options: [
			{
				displayValue: 'Year',
				value: 'year',
			},
			{
				displayValue: 'Month',
				value: 'month',
			},
		],
	};

	// Render
	return (
		<Toolbar.Root className="flex items-center">
			<Toolbar.ToggleGroup
				type="single"
				value={tab}
				aria-label="Value display"
				className="bg-grayscale-100 text-grayscale-800 flex grow items-center justify-center gap-2 rounded-md p-1"
			>
				{SelectGroup.options.map((item) => (
					<Toolbar.ToggleItem
						key={item.value}
						value={item.value}
						aria-label={item.displayValue}
						className="data-[state=on]:text-grayscale-800 data-[state=off]:text-grayscale-300 hover:text-grayscale-400 cursor-pointer rounded px-1.5 py-1 text-xs data-[state=on]:bg-white"
						asChild
					>
						<Link
							href={{
								pathname: pathname,
								query: {
									...params,
									tab: item.value,
								},
							}}
						>
							{item.displayValue}
						</Link>
					</Toolbar.ToggleItem>
				))}
			</Toolbar.ToggleGroup>
		</Toolbar.Root>
	);
}
