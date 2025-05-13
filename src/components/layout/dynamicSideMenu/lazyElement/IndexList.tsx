'use client';

// Import
import Button from '@/components/ui/Button';
import Disclosure from '@/components/ui/Disclosure';
import { useCtxMenu } from '@/stores/useCtxMenu';
import { LocalItem as CalendarViewRecord } from '@utils/frequentRequest/calendar';
import utilsDate from '@utils/utilsDate';
import { utilsUtils } from '@utils/utilsUtils';
import { usePathname, useSearchParams } from 'next/navigation';

// Define

export default function IndexList() {
	// Data
	const { ctx } = useCtxMenu();
	const { transformToPhraseCase } = utilsUtils();
	const { formatMonth } = utilsDate();
	const searchParams = useSearchParams();
	const params = Object.fromEntries(searchParams.entries());

	const pathname = usePathname();
	// const searchYear = searchParams.get('year');
	const indexData = ctx.index as CalendarViewRecord[];

	// Methods
	// TODO le Disclosure se ferme quand je clique sur un autre lien je voudrais le laisser ouver.

	// Render
	return (
		<ul className="scrollbar-none h-full shrink-0 overflow-y-auto">
			{indexData.map((item, index) => (
				<li key={index} className="mb-4">
					<Disclosure
						label={String(item.year)}
						// defaultOpen={Number(searchYear) == item.year}
						variant="nude"
						squared
						ui={{ base: 'bg-grayscale-50' }}
					>
						<ul>
							{item.months.map((month, i) => (
								<li key={i}>
									{/*	(*/}

									{/*	)*/}
									{/*TODO majusculiser le mots*/}
									<Button
										label={transformToPhraseCase(
											formatMonth(item.year, month, {
												month: 'long',
											})
										)}
										to={{
											pathname,
											query: {
												...params,
												year: item.year,
												month: month,
											},
										}}
										variant="nude"
										size="sm"
									/>
								</li>
							))}
						</ul>
					</Disclosure>
				</li>
			))}
		</ul>
	);
}
