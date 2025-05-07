import {
	DAYS,
	MONTHS,
	PAYMENT_STATUS,
	RECEIPT_STATUS,
	TRANSACTION_TYPES,
} from '@/server/utilsData/types/_api_c';

export type TransactionType = (typeof TRANSACTION_TYPES)[number];
export type ReceiptStatus = (typeof RECEIPT_STATUS)[number];
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
export type Month = (typeof MONTHS)[number];
export type Day = (typeof DAYS)[number];

export interface BaseTransaction {
	_id: string;
	label: string;
	category: string;
	currency: string;
	amount: number;
	month: Month;
	year: number;
}

export interface IncomeTransaction extends BaseTransaction {
	type: TransactionType['income'];
	status: PaymentStatus;
	dayReception?: Day;
}

export interface OutcomeTransaction extends BaseTransaction {
	type: TransactionType['outcome'];
	status: ReceiptStatus;
	dayDue?: Day;
	dayPayment?: Day;
}

export interface UnknownTransaction extends BaseTransaction {
	type: 'income' | 'outcome';
	status?: ReceiptStatus | PaymentStatus;
	dayReception?: Day;
	dayDue?: Day;
	dayPayment?: Day;
}

/*interface TransactionCategory<T> {
	total: number;
	category: string;
	transactions: T[];
}*/

/*interface MonthDataModel {
	id: string;
	year: number;
	month: number;
	totalIncome: number;
	totalOutcome: number;
	incomes: TransactionCategory<IncomeCategoryGroup>[];
	outcomes: TransactionCategory<OutcomeTransaction>[];
}*/

export type KeyValue = {
	key: string;
	value: number;
};

export interface FilterOption {
	type?: string;
}

export type Transaction = IncomeTransaction | OutcomeTransaction;
