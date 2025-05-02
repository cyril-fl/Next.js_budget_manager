// Import
import { ModelFactory } from '@/factories/ModelFactory';
import { CalendarRecord } from '@/models/Calendar';
import { MonthlyTransactionRecord } from '@/models/Month';
import { MonthSummaryRecord, YearlySummaryRecord } from '@/models/Summary';
import { YearlyTransactionRecord } from '@/models/Year';
import { TransactionRecord, UnknownTransaction } from '@types';

interface Patch {
	id: string;
	patch: Partial<UnknownTransaction>;
}
// Class
export class DataRepository {
	protected records: TransactionRecord[];

	constructor(flux: TransactionRecord[] = []) {
		this.records = flux;
	}

	//Method

	// C
	add(
		record: Omit<UnknownTransaction, 'id'> | Omit<UnknownTransaction, 'id'>[]
	): void {
		const temp = Array.isArray(record) ? record : [record];

		const transaction = temp.map((r) => {
			return {
				...r,
				// id: `${r.type.slice(0, 3).toUpperCase()}-${r.category.slice(0, 3).toUpperCase()}-${r.year}-${r.month}-${Date.now()}`,
				id: `${r.type.slice(0, 3).toUpperCase()}-${r.category.slice(0, 3).toUpperCase()}-${r.year}-${r.month}`,
			};
		});

		const transactionRecord =
			ModelFactory.createTransactionRecordList(transaction);

		this.records.push(...transactionRecord);
	}

	// R
	get transactions(): TransactionRecord[] {
		return this.records;
	}

	get months(): MonthlyTransactionRecord[] {
		const map = new Map<string, MonthlyTransactionRecord>();

		for (const record of this.records) {
			const { year, month } = record;
			const key = `${year}-${month}`;

			if (!map.has(key)) {
				const newData =
					ModelFactory.createMonthlyTransactionRecord<MonthlyTransactionRecord>(
						year,
						month
					);
				map.set(key, newData);
			}

			map.get(key)!.add(record);
		}

		return Array.from(map.values());
	}

	get monthlySummary(): MonthSummaryRecord[] {
		const groupedByMonth = this.records.reduce<
			Record<string, TransactionRecord[]>
		>((acc, transaction) => {
			const key = `${transaction.year}-${String(transaction.month).padStart(2, '0')}`;

			if (!acc[key]) acc[key] = [];

			acc[key].push(transaction);
			return acc;
		}, {});

		return Object.entries(groupedByMonth).map(([key, records]) => {
			const [year, month] = key.split('-').map(Number);
			return new MonthSummaryRecord(year, month, records);
		});
	}

	get years(): YearlyTransactionRecord[] {
		const map = new Map<number, YearlyTransactionRecord>();

		for (const record of this.records) {
			const { year } = record;

			if (!map.has(year)) {
				const newData = new YearlyTransactionRecord(year);
				map.set(year, newData);
			}

			map.get(year)!.add(record);
		}

		return Array.from(map.values()).map((year) => {
			year.months.sort((a, b) => a.month - b.month);
			return year;
		});
	}

	get yearlySummary(): YearlySummaryRecord[] {
		const groupedByYear = this.records.reduce<
			Record<number, TransactionRecord[]>
		>((acc, transaction) => {
			const year = transaction.year;

			if (!acc[year]) acc[year] = [];

			acc[year].push(transaction);
			return acc;
		}, {});

		return Object.entries(groupedByYear).map(([year, records]) => {
			records.sort((a, b) => a.month - b.month);
			return new YearlySummaryRecord(Number(year), records);
		});
	}

	get calendar(): CalendarRecord[] {
		const map = new Map<number, Map<number, Set<string>>>();

		for (const record of this.records) {
			const { year: y, month: m } = record;

			if (!map.has(y)) {
				map.set(y, new Map());
			}
			const years = map.get(y)!;

			if (!years.has(m)) {
				years.set(m, new Set());
			}

			const month = years.get(m)!;

			record.date
				.filter((d): d is Date => !!d)
				.map((d) => new Date(d))
				.filter((d) => !isNaN(d.getTime()))
				.forEach((date) => month.add(date.toISOString()));
		}

		return Array.from(map.entries())
			.map(([year, monthsMap]) => {
				const months: Record<number, Date[]> = {};
				const monthIndex: number[] = [];

				for (const [month, dateSet] of monthsMap.entries()) {
					months[month] = Array.from(dateSet).map((iso) => new Date(iso));
					monthIndex.push(month);
				}
				const monthIndexSorted = monthIndex.sort((a, b) => a - b);

				return new CalendarRecord(year, monthIndexSorted, months);
			})
			.sort((a, b) => a.year - b.year);
	}

	// U
	update(value: Patch | Patch[]): void {
		const updates = Array.isArray(value) ? value : [value];
		const patchMap = new Map(updates.map(({ id, patch }) => [id, patch]));

		this.records = this.records.map((record) => {
			const patch = patchMap.get(record.id);
			if (!patch) return record;

			const updatedData = {
				...record,
				...patch,
			} as UnknownTransaction;

			const updatedRecord = ModelFactory.createTransactionRecord(updatedData);
			return updatedRecord ?? record;
		});
	}

	//  D
	delete(id: string | string[]) {
		const ids = Array.isArray(id) ? id : [id];

		this.records = this.records.filter((record) => !ids.includes(record.id));

		return this.records;
	}

	// S
}
