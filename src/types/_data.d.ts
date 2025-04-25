import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@/models/Transaction';
import { FLUX_TYPES, MONTHS, PAYMENT_STATUS, RECEIPT_STATUS } from './constant';

export type FluxType = (typeof FLUX_TYPES)[number];
export type ReceiptStatus = (typeof RECEIPT_STATUS)[number];
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
export type Month = (typeof MONTHS)[number];

export interface BaseTransaction {
	id: string;
	label: string;
	category: string;
	currency: string;
	amount: number;
	reportMonth: Month;
	reportYear: number;
}

export interface IncomeTransaction extends BaseTransaction {
	type: 'income';
	status?: PaymentStatus;
	date_reception?: Date;
}

export interface OutcomeTransaction extends BaseTransaction {
	type: 'outcome';
	status: ReceiptStatus;
	date_due?: Date;
	date_payment?: Date;
}

export interface UnknownTransaction extends BaseTransaction {
	type: 'income' | 'outcome';
	status?: ReceiptStatus | PaymentStatus;
	date_reception?: Date;
	date_due?: Date;
	date_payment?: Date;
}

interface TransactionCategory<T> {
	total: number;
	category: string;
	transactions: T[];
}

interface MonthDataModel {
	id: string;
	reportYear: number;
	reportMonth: number;
	totalIncome: number;
	totalOutcome: number;
	incomes: TransactionCategory<IncomeCategoryGroup>[];
	outcomes: TransactionCategory<OutcomeTransaction>[];
}

interface YearDataModel {
	id: string;
	reportYear: number;
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

export type TransactionRecord =
	| OutcomeTransactionRecord
	| IncomeTransactionRecord;
