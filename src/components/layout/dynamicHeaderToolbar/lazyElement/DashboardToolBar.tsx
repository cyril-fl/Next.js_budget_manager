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
				displayValue: 'Yearly',
				value: 'year',
			},
			{
				displayValue: 'Monthly',
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
				className="bg-grayscale-100 text-grayscale-700 flex items-center justify-center gap-2 rounded-md px-1.5 py-1"
			>
				{SelectGroup.options.map((item) => (
					<Toolbar.ToggleItem
						key={item.value}
						value={item.value}
						aria-label={item.displayValue}
						className="data-[state=on]:text-grayscale-800 hover:text-grayscale-400 cursor-pointer rounded px-1.5 py-1 text-xs data-[state=on]:bg-white"
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

// Define

// export default () => (

// 	</HoverCard.Root>
// );
