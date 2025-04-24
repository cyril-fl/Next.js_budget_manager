'use client';
import Button from '@/components/global/Button';
import { useCtxMenu } from '@/stores/useCtxMenu';
import utilsDate from '@utils/utilsDate';

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
	const { ctx } = useCtxMenu();
	const { formatMonth } = utilsDate();

	const overviewData = ctx.overview.filter(isCalendarViewRecord);

	// TODO transformer ça en Disclosure !
	return (
		<ul className="h-ful scrollbar-none overflow-y-auto">
			{overviewData.map((item, index) => (
				<li key={index} className="mb-4">
					<div className="sticky top-0 z-20 font-bold">{item.reportYear}</div>
					<ul>
						{item.monthsIndex.map((month, i) => (
							<li key={i} className="px-2 py-1">
								<Button
									label={formatMonth(item.reportYear, month, { month: 'long' })}
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
				</li>
			))}
		</ul>
	);
}
