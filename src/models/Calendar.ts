export class CalendarRecord {
	readonly reportYear: number;
	readonly monthsIndex: number[];
	readonly detailedMonth: Record<number, Date[]>;

	constructor(
		reportYear: number,
		monthsIndex: number[],
		detailedMonth: Record<number, Date[]>
	) {
		this.reportYear = reportYear;
		this.monthsIndex = monthsIndex;
		this.detailedMonth = detailedMonth;
	}
}
