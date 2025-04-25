'use client';
// Import
import Button from '@/components/global/Button';
import Disclosure from '@/components/global/Disclosure';
import { useCtxMenu } from '@/stores/useCtxMenu';
import utilsDate from '@utils/utilsDate';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

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
	const [isOpen, setIsOpen] = useState(
		overviewData.map((item) => {
			return Number(searchYear) == item.reportYear;
		})
	);

	// Methods
	const handleOpen = (e: boolean, index: number) => {
		const newState = [...isOpen];
		newState[index] = e;
		setIsOpen(newState);
		console.log('handleOpen', e);
	};

	// Render
	return (
		<ul className="scrollbar-none h-full w-24 shrink-0 overflow-y-auto">
			{overviewData.map((item, index) => (
				<li key={index} className="mb-4">
					<Disclosure
						label={String(item.reportYear)}
						open={isOpen[index]}
						onOpenChange={(e) => handleOpen(e, index)}
						defaultOpen={Number(searchYear) == item.reportYear}
						triggerProps={{
							variant: 'nude',
							squared: true,
						}}
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
