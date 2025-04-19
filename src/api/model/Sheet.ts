// Import
import { ModelFactory } from '../factory/ModelFactory';
import {
	MonthlyTransactionRecord,
	MonthlyTransactionSimplifiedRecord,
} from './Month';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from './Transaction';
import { YearlyTransactionRecord } from './Year';

// Class
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
		return this.records.reduce<MonthlyTransactionRecord[]>((acc, record) => {
			const { reportYear, reportMonth } = record;

			let monthData = acc.find((g) => g.id === record.id);

			if (!monthData) {
				monthData = ModelFactory.createMonthlyTransactionRecord(
					reportYear,
					reportMonth
				) as MonthlyTransactionRecord;
				acc.push(monthData);
			}

			monthData.add(record);
			return acc;
		}, []);
	}
	get years(): YearlyTransactionRecord[] {
		return this.months.reduce<YearlyTransactionRecord[]>((acc, monthData) => {
			const { reportYear } = monthData;

			let yearData = acc.find((y) => y.reportYear === reportYear);

			if (!yearData) {
				yearData = new YearlyTransactionRecord(reportYear);
				acc.push(yearData);
			}

			const simplifiedData: MonthlyTransactionSimplifiedRecord =
				ModelFactory.createMonthlyTransactionRecord(
					monthData.reportYear,
					monthData.reportMonth,
					monthData.incomes,
					monthData.outcomes,
					{
						simplified: true,
					}
				);

			yearData.add(simplifiedData);
			return acc;
		}, []);
	}
	// U
	// D
	// S
}
