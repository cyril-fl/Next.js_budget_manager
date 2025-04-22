// Import
import { ModelFactory } from '@/factories/ModelFactory';
import { MonthlyTransactionRecord } from '@/models/Month';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@/models/Transaction';
import { YearlyTransactionRecord } from '@/models/Year';

// Class
// TODO RENOMMER
export class SheetDataModel {
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
				const monthData =
					ModelFactory.createMonthlyTransactionRecord<MonthlyTransactionRecord>(
						reportYear,
						reportMonth
					);
				map.set(key, monthData);
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
				map.set(reportYear, new YearlyTransactionRecord(reportYear));
			}

			map.get(reportYear)!.add(record);
		}

		return Array.from(map.values()).map((year) => {
			year.months.sort((a, b) => a.reportMonth - b.reportMonth);
			return year;
		});
	}
	// U
	// D
	// S
}
