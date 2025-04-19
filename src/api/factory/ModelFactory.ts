import {
	IncomeTransaction,
	Month,
	OutcomeTransaction,
	PaymentStatus,
	ReceiptStatus,
} from '@types';
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

	static createTransactionRecord(
		data: Array<IncomeTransaction | OutcomeTransaction>
	) {
		return data
			.map((r) => {
				if (!r.type) return null;

				const common: [string, string, string, string, number, Month, number] =
					[
						r.id,
						r.label,
						r.category,
						r.currency,
						r.amount,
						r.reportMonth,
						r.reportYear,
					];

				switch (r.type) {
					case 'income':
						return new IncomeTransactionRecord(
							...common,
							r.status as ReceiptStatus,
							r.date_reception ? new Date(r.date_reception) : undefined
						);
					case 'outcome':
						return new OutcomeTransactionRecord(
							...common,
							r.status as PaymentStatus,
							r.date_due ? new Date(r.date_due) : undefined,
							r.date_payment ? new Date(r.date_payment) : undefined
						);
					default:
						return null;
				}
			})
			.filter(Boolean) as Array<
			IncomeTransactionRecord | OutcomeTransactionRecord
		>;
	}
}
