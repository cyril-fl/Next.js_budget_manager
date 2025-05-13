'use client';

// Import
import { useCtxMenu } from '@/stores/useCtxMenu';
import { LocalItem as CalendarViewRecord } from '@utils/frequentRequest/calendar';
import utilsDate from '@utils/utilsDate';
import { utilsUtils } from '@utils/utilsUtils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// Define

export default function IndexListShort() {
	// Data
	const { ctx } = useCtxMenu();
	const { transformToPhraseCase } = utilsUtils();
	const { formatMonth } = utilsDate();
	const searchParams = useSearchParams();
	const params = Object.fromEntries(searchParams.entries());

	const pathname = usePathname();
	const indexData = ctx.index as CalendarViewRecord[];

	// Methods

	// Render
	return (
		<ul className="scrollbar-none h-full shrink-0 overflow-y-auto">
			{indexData.map((item, index) => (
				<li key={index} className="mb-4">
					<Link
						className="text-grayscale-700 hover:text-grayscale-200 active:text-grayscale-300 relative top-0 z-10 flex cursor-pointer items-center justify-between text-sm font-medium"
						href={{
							pathname,
							query: {
								...params,
								year: item.year,
							},
						}}
					>
						{String(item.year)}
					</Link>
				</li>
			))}
		</ul>
	);
}
