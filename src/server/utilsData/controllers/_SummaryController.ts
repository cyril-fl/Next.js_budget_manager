import { FilterOption, KeyValue, Transaction } from '../types';

export abstract class SummaryController {
	protected constructor() {}

	protected getBalance(a?: number, b?: number) {
		if (a === undefined || b === undefined) return;
		return a - b;
	}

	protected getTop(values: KeyValue[]) {
		return values.slice().sort((a, b) => b.value - a.value)[0]?.key;
	}

	protected getTotal(record?: Transaction[]) {
		if (!record) return;
		return record.reduce((acc, transaction) => acc + transaction.amount, 0);
	}

	protected getRatio(a?: number, b?: number) {
		if (a === undefined || b === undefined) return;
		return b > 0 ? a / b : null;
	}

	protected getAverage(a?: number, b?: number) {
		if (a === undefined || b === undefined) return;
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

	protected getFiltered(values: Transaction[], option?: FilterOption) {
		if (!option?.type) return values;
		return values.filter((transaction) => transaction.type === option.type);
	}

	protected buildStats(records: Transaction[], total: number) {}
}
