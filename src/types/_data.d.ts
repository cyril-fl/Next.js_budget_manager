import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@/models/Transaction';
import {
	DAYS,
	MONTHS,
	PAYMENT_STATUS,
	RECEIPT_STATUS,
	TRANSACTION_TYPES,
} from './constant';

export type TransactionType = (typeof TRANSACTION_TYPES)[number];
export type ReceiptStatus = (typeof RECEIPT_STATUS)[number];
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
export type Month = (typeof MONTHS)[number];
export type Day = (typeof DAYS)[number];

export interface BaseTransaction {
	id: string;
	label: string;
	category: string;
	currency: string;
	amount: number;
	month: Month;
	year: number;
}

export interface IncomeTransaction extends BaseTransaction {
	type: 'income';
	status?: PaymentStatus;
	dayReception?: Day;
}

export interface OutcomeTransaction extends BaseTransaction {
	type: 'outcome';
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

interface TransactionCategory<T> {
	total: number;
	category: string;
	transactions: T[];
}

interface MonthDataModel {
	id: string;
	year: number;
	month: number;
	totalIncome: number;
	totalOutcome: number;
	incomes: TransactionCategory<IncomeCategoryGroup>[];
	outcomes: TransactionCategory<OutcomeTransaction>[];
}

interface YearDataModel {
	id: string;
	year: number;
	totalIncome: number;
	totalOutcome: number;
	months: MonthDataModel[];
}

export type KeyValue = {
	key: string;
	value: number;
};

export interface FilterOption {
	type?: string;
}

export type Transaction = IncomeTransaction | OutcomeTransaction;

export type TransactionRecord =
	| OutcomeTransactionRecord
	| IncomeTransactionRecord;
