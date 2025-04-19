import { Month, ReceiptStatus } from '@/types/_data';

export interface TransactionsCategory<T> {
	category: string;
	transactions: T[];
}

export interface IncomeTransaction {
	id: string;
	label: string;
	category: string;
	currency: string;
	s;
	amount: number;
	reportMonth: Month;
	reportYear: number;
	type: 'income';
	status?: PaymentStatus;
	date_reception?: Date;
}
export interface OutcomeTransaction {
	id: string;
	label: string;
	category: string;
	currency: string;
	amount: number;
	reportMonth: Month;
	reportYear: number;
	type: 'outcome';
	status: ReceiptStatus;
	date_due?: Date;
	date_payment?: Date;
}
