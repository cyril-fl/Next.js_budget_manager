import { CategoryRecord } from '@/models/Category';
import {
	MonthlyTransactionRecord,
	MonthlyTransactionSimplifiedRecord,
} from '@/models/Month';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@/models/Transaction';
import {
	IncomeTransaction,
	Month,
	OutcomeTransaction,
	PaymentStatus,
	ReceiptStatus,
} from '@types';

export class ModelFactory {
	// Static Methods
	static createMonthlyTransactionRecord<
		T extends MonthlyTransactionRecord | MonthlyTransactionSimplifiedRecord,
	>(
		reportYear: number,
		reportMonth: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = [],
		option?: {
			simplified?: boolean;
		}
	): T {
		const object = option?.simplified
			? MonthlyTransactionSimplifiedRecord
			: MonthlyTransactionRecord;

		return new object(reportYear, reportMonth, incomes, outcomes) as T;
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
