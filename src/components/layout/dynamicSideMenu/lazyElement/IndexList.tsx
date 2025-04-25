'use client';
// Import
import Button from '@/components/ui/Button';
import Disclosure from '@/components/ui/Disclosure';
import { useCtxMenu } from '@/stores/useCtxMenu';
import utilsDate from '@utils/utilsDate';
import { useSearchParams } from 'next/navigation';

// Define
export interface CalendarViewRecord {
	reportYear: number;
	monthsIndex: number[];
	detailedMonth: Record<number, Date[]>;
}

function isCalendarViewRecord(val: unknown): val is CalendarViewRecord {
	return (
		typeof val === 'object' &&
		val !== null &&
		Array.isArray((val as CalendarViewRecord).monthsIndex)
	);
}

export default function IndexList() {
	// Data
	const { ctx } = useCtxMenu();
	const { formatMonth } = utilsDate();
	const searchParams = useSearchParams();
	const searchYear = searchParams.get('year');
	const overviewData = ctx.overview.filter(isCalendarViewRecord);

	// Methods

	// Render
	return (
		<ul className="scrollbar-none h-full w-24 shrink-0 overflow-y-auto">
			{overviewData.map((item, index) => (
				<li key={index} className="mb-4">
					<Disclosure
						label={String(item.reportYear)}
						defaultOpen={Number(searchYear) == item.reportYear}
						variant="nude"
						squared
						ui={{ base: 'bg-grayscale-50' }}
					>
						<ul>
							{item.monthsIndex.map((month, i) => (
								<li key={i} className="px-2 py-1">
									<Button
										label={formatMonth(item.reportYear, month, {
											month: 'long',
										})}
										to={{
											pathname: '/overview',
											query: {
												year: item.reportYear,
												month: month,
											},
										}}
										variant="nude"
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
