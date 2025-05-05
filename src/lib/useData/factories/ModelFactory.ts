import {
	Month,
	PaymentStatus,
	ReceiptStatus,
	TransactionRecord,
	UnknownTransaction,
} from '@types';
import { CategoryRecord } from '../models/Category';
import {
	MonthlyTransactionRecord,
	MonthlyTransactionSimplifiedRecord,
} from '../models/Month';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '../models/Transaction';

export class ModelFactory {
	// Static Methods
	static createMonthlyTransactionRecord<
		T extends MonthlyTransactionRecord | MonthlyTransactionSimplifiedRecord,
	>(
		year: number,
		month: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = [],
		option?: {
			simplified?: boolean;
		}
	): T {
		const object = option?.simplified
			? MonthlyTransactionSimplifiedRecord
			: MonthlyTransactionRecord;

		return new object(year, month, incomes, outcomes) as T;
	}

	static createTransactionRecord(
		transaction: UnknownTransaction
	): TransactionRecord | null {
		if (!transaction.type) return null;

		const common: [string, string, string, string, number, Month, number] = [
			transaction.id,
			transaction.label,
			transaction.category,
			transaction.currency,
			transaction.amount,
			transaction.month,
			transaction.year,
		];

		switch (transaction.type) {
			case 'income':
				return new IncomeTransactionRecord(
					...common,
					transaction.status as ReceiptStatus,
					transaction.dayReception
				);
			case 'outcome':
				return new OutcomeTransactionRecord(
					...common,
					transaction.status as PaymentStatus,
					transaction.dayDue,
					transaction.dayPayment
				);
			default:
				return null;
		}
	}

	static createTransactionRecordList(data: UnknownTransaction[]) {
		return data
			.map((r) => ModelFactory.createTransactionRecord(r))
			.filter(Boolean) as TransactionRecord[];
	}
}
