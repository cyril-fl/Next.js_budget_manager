import { Month, ReceiptStatus } from '@/types/_data';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@api/model/Transaction';

export interface TransactionsCategory<T> {
	category: string;
	transactions: T[];
}

export type AllTransactionsCategory =
	TransactionsCategory<IncomeTransactionRecord> &
		TransactionsCategory<OutcomeTransactionRecord>;

export interface AllTransactionsRecord {
	id: string;
	label: string;
	category: string;
	currency: string;
	rawAmount: number;
	reportMonth: Month;
	reportYear: number;
	type: 'income' | 'outcome';
	status?: PaymentStatus | ReceiptStatus;
	date_due?: Date;
	date_payment?: Date;
	date_reception?: Date;
}
