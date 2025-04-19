import { CategoryRecord } from '../model/Category';
import {
	MonthlyTransactionRecord,
	MonthlyTransactionSimplifiedRecord,
} from '../model/Month';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '../model/Transaction';

export class ModelFactory {
	// Static Methods
	static createMonthlyTransactionRecord(
		reportYear: number,
		reportMonth: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = [],
		option?: {
			simplified?: boolean;
		}
	): MonthlyTransactionRecord | MonthlyTransactionSimplifiedRecord {
		const object = option?.simplified
			? MonthlyTransactionSimplifiedRecord
			: MonthlyTransactionRecord;

		return new object(reportYear, reportMonth, incomes, outcomes);
	}
}
