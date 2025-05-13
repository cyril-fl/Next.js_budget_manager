// Import
import { SummaryController } from '../controllers';
import { Month, Transaction } from '../types';

// TODO mettre ailleru
export interface Category {
	name: string;
	amount: number;
	transactions: Transaction[];
}

// Define
export interface RawRecordM {
	year?: number;
	month?: Month;
	transactionCount?: number;
	incomes?: Transaction[];
	outcomes?: Transaction[];
}

// Class
export class SummaryMonthly extends SummaryController {
	readonly year?: number;
	readonly month?: Month;
	// readonly transactionCount?: number;
	readonly incomesCategory?: Category[];
	readonly outcomesCategory?: Category[];

	constructor(records: RawRecordM) {
		super();
		this.year = records.year;
		this.month = records.month;

		this.incomesCategory = this.buildCategory(records.incomes);
		this.outcomesCategory = this.buildCategory(records.outcomes);

		// this.transactionCount = records.transactionCount;
		// this.balance = this.getBalance(this.totalIncome, this.totalOutcome);
		// this.inNoutRatio = this.getRatio(this.totalIncome, this.totalOutcome);
	}

	buildCategory(records?: Transaction[]) {
		if (!records || records.length === 0) return;

		const map = new Map<string, Category>();

		for (const tx of records) {
			const category = map.get(tx.category) ?? {
				name: tx.category,
				amount: 0,
				transactions: [],
			};

			category.amount += tx.amount;
			category.transactions.push(tx);

			map.set(tx.category, category);
		}

		return Array.from(map.values());
	}
}
