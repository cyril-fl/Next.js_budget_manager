// Import
import { ModelFactory } from '@/factories/ModelFactory';
import { CalendarRecord } from '@/models/Calendar';
import { MonthlyTransactionRecord } from '@/models/Month';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@/models/Transaction';
import { YearlyTransactionRecord } from '@/models/Year';

// Class
export class DataFactory {
	private readonly records: Array<
		OutcomeTransactionRecord | IncomeTransactionRecord
	>;

	constructor(
		flux: Array<OutcomeTransactionRecord | IncomeTransactionRecord> = []
	) {
		this.records = flux;
	}

	//Method

	// C
	// R
	get transactions() {
		return this.records;
	}

	get months(): MonthlyTransactionRecord[] {
		const map = new Map<string, MonthlyTransactionRecord>();

		for (const record of this.records) {
			const { reportYear, reportMonth } = record;
			const key = `${reportYear}-${reportMonth}`;

			if (!map.has(key)) {
				const newData =
					ModelFactory.createMonthlyTransactionRecord<MonthlyTransactionRecord>(
						reportYear,
						reportMonth
					);
				map.set(key, newData);
			}

			map.get(key)!.add(record);
		}

		return Array.from(map.values());
	}

	get years(): YearlyTransactionRecord[] {
		const map = new Map<number, YearlyTransactionRecord>();

		for (const record of this.records) {
			const { reportYear } = record;

			if (!map.has(reportYear)) {
				const newData = new YearlyTransactionRecord(reportYear);
				map.set(reportYear, newData);
			}

			map.get(reportYear)!.add(record);
		}

		return Array.from(map.values()).map((year) => {
			year.months.sort((a, b) => a.reportMonth - b.reportMonth);
			return year;
		});
	}

	get calendar(): CalendarRecord[] {
		const map = new Map<number, Map<number, Set<string>>>();

		for (const record of this.records) {
			const { reportYear: y, reportMonth: m } = record;

			if (!map.has(y)) {
				map.set(y, new Map());
			}
			const years = map.get(y)!;

			if (!years.has(m)) {
				years.set(m, new Set());
			}

			const month = years.get(m)!;

			record.date
				.filter((d): d is Date => !!d)
				.map((d) => new Date(d))
				.filter((d) => !isNaN(d.getTime()))
				.forEach((date) => month.add(date.toISOString()));
		}

		return Array.from(map.entries())
			.map(([year, monthsMap]) => {
				const months: Record<number, Date[]> = {};
				const monthIndex: number[] = [];

				for (const [month, dateSet] of monthsMap.entries()) {
					months[month] = Array.from(dateSet).map((iso) => new Date(iso));
					monthIndex.push(month);
				}

				return new CalendarRecord(year, monthIndex, months);
			})
			.sort((a, b) => a.year - b.year);
	} // D
	// S
}
