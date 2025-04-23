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
		typeof (val as CalendarViewRecord).reportYear === 'number' &&
		Array.isArray((val as CalendarViewRecord).monthsIndex)
	);
}

export default function IndexList() {
	const { ctx } = useCtxMenu();
	const { formatMonth } = utilsDate();

	const overviewData = ctx.overview.filter(isCalendarViewRecord);

	return (
		<div className="scrollbar-none mr-4 overflow-auto">
			{overviewData.map((item, index) => (
				<ul key={index}>
					<li>{item.reportYear}</li>
					<li className="px-1">
						<ul>
							{item.monthsIndex.map((month, i) => (
								<li key={i}>
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
										// TODO faire ca avec pour le current month from param
										// variant={m.reportMonth === month ? 'solid' : 'ghost'}
										variant="nude"
									/>
								</li>
							))}
						</ul>
					</li>
				</ul>
			))}
		</div>
	);
}
