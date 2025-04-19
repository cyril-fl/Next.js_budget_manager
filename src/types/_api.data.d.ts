import { Month, ReceiptStatus } from '@/types/_data';

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
