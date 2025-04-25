// Import
import { FilterOption, KeyValue, TransactionRecord } from '@types';

// Define
export type YSummaryStats = {
	amountByCategory: KeyValue[];
	amountByMonth: KeyValue[];
	monthlyTransactionCount: KeyValue[];
	monthlyAverage: number | null;
	categoryPercentage: KeyValue[];
	topCategory: string;
	topMonth: string;
};

type MSummaryStats = {
	amountByCategory: KeyValue[];
	categoryPercentage: KeyValue[];
	topCategory: string;
};

export abstract class SummaryRecord {
	protected constructor() {}

	protected getBalance(a: number, b: number) {
		return a - b;
	}

	protected getTop(values: KeyValue[]) {
		return values.slice().sort((a, b) => b.value - a.value)[0]?.key;
	}

	protected getTotal(record: TransactionRecord[]) {
		return record.reduce((acc, transaction) => acc + transaction.amount, 0);
	}

	protected getRatio(a: number, b: number) {
		return b > 0 ? a / b : null;
	}

	protected getAverage(a: number, b: number) {
		return b > 0 ? a / b : null;
	}

	protected getKeyValue(values: Record<string, number>) {
		return Object.entries(values).map(([key, value]) => ({
			key,
			value,
		}));
	}

	protected getPercentage(data: KeyValue[], total: number): KeyValue[] {
		return data.map(({ key, value }) => ({
			key,
			value: total > 0 ? (value / total) * 100 : 0,
		}));
	}

	protected getFiltered(values: TransactionRecord[], option?: FilterOption) {
		if (!option?.type) return values;
		return values.filter((transaction) => transaction.type === option.type);
	}
}

export class YearlySummaryRecord extends SummaryRecord {
	readonly reportYear: number;
	readonly monthsList: number[];

	readonly monthlyTransactionCount: KeyValue[];

	readonly income: number;
	readonly outcome: number;
	readonly balance: number;
	readonly inNoutRatio: number | null;

	readonly statsIncomes: YSummaryStats;
	readonly statsOutcome: YSummaryStats;

	constructor(year: number, records: TransactionRecord[]) {
		super();
		this.reportYear = year;

		this.monthsList = this.getDistinctMonths(records);

		this.monthlyTransactionCount = this.buildTransactionCountByMonth(records);

		this.income = this.getTotal(this.getFiltered(records, { type: 'income' }));
		this.outcome = this.getTotal(
			this.getFiltered(records, { type: 'outcome' })
		);
		this.balance = this.getBalance(this.income, this.outcome);
		this.inNoutRatio = this.getRatio(this.income, this.outcome);

		this.statsIncomes = this.buildStats(
			this.getFiltered(records, { type: 'income' }),
			this.income
		);
		this.statsOutcome = this.buildStats(
			this.getFiltered(records, { type: 'income' }),
			this.outcome
		);
	}

	private getDistinctMonths(records: TransactionRecord[]): number[] {
		return [...new Set(records.map((r) => r.reportMonth))].sort(
			(a, b) => a - b
		);
	}

	private buildTransactionCountByMonth(
		records: TransactionRecord[]
	): KeyValue[] {
		const countByMonth: Record<number, number> = {};
		records.forEach(({ reportMonth }) => {
			countByMonth[reportMonth] = (countByMonth[reportMonth] || 0) + 1;
		});
		return this.getKeyValue(countByMonth);
	}

	private buildStats(
		records: TransactionRecord[],
		total: number
	): YSummaryStats {
		const catSum: Record<string, number> = {};
		const monthSum: Record<number, number> = {};
		const txCountByMonth: Record<number, number> = {};

		records.forEach(({ value, amount, reportMonth }) => {
			catSum[value.category] = (catSum[value.category] || 0) + amount;
			monthSum[reportMonth] = (monthSum[reportMonth] || 0) + amount;
			txCountByMonth[reportMonth] = (txCountByMonth[reportMonth] || 0) + 1;
		});

		const amountByCategory = this.getKeyValue(catSum);
		const amountByMonth = this.getKeyValue(monthSum);
		const monthlyTransactionCount = this.getKeyValue(txCountByMonth);
		const categoryPercentage = this.getPercentage(amountByCategory, total);

		return {
			amountByCategory,
			amountByMonth,
			monthlyTransactionCount,
			monthlyAverage: this.getAverage(total, this.monthsList.length),
			topMonth: this.getTop(amountByMonth),
			categoryPercentage,
			topCategory: this.getTop(categoryPercentage),
		};
	}
}

export class MonthSummary extends SummaryRecord {
	readonly reportYear: number;
	readonly reportMonth: number;

	readonly transactionCount: number;

	readonly income: number;
	readonly outcome: number;
	readonly balance: number;
	readonly inNoutRatio: number | null;

	readonly statsIncomes: MSummaryStats;
	readonly statsOutcome: MSummaryStats;

	constructor(year: number, month: number, records: TransactionRecord[]) {
		super();
		this.reportYear = year;
		this.reportYear = year;
		this.reportMonth = month;

		this.transactionCount = records.length;

		this.income = this.getTotal(this.getFiltered(records, { type: 'income' }));
		this.outcome = this.getTotal(
			this.getFiltered(records, { type: 'outcome' })
		);
		this.balance = this.getBalance(this.income, this.outcome);
		this.inNoutRatio = this.getRatio(this.income, this.outcome);

		this.statsIncomes = this.buildStats(
			this.getFiltered(records, { type: 'income' }),
			this.income
		);
		this.statsOutcome = this.buildStats(
			this.getFiltered(records, { type: 'outcome' }),
			this.outcome
		);
	}

	private buildStats(
		records: TransactionRecord[],
		total: number
	): MSummaryStats {
		const catSum: Record<string, number> = {};

		records.forEach(({ value, amount, reportMonth }) => {
			catSum[value.category] = (catSum[value.category] || 0) + amount;
		});

		const amountByCategory = this.getKeyValue(catSum);
		const categoryPercentage = this.getPercentage(amountByCategory, total);

		return {
			amountByCategory: amountByCategory,
			categoryPercentage: categoryPercentage,
			topCategory: this.getTop(categoryPercentage),
		};
	}
}
