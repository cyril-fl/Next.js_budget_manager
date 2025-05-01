// Import
import { FinancialOperation } from '@/controllers/FinancialOperation';
import { CategoryRecord } from './Category';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from './Transaction';

// Class
export abstract class BaseMonthlyTransactionRecord extends FinancialOperation {
	readonly id: string;
	readonly month: number;
	readonly incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [];
	readonly outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = [];

	protected constructor(
		year: number,
		month: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = []
	) {
		super();
		this.id = `m-${year}-${month}`;
		this.month = month;
		this.incomes = incomes;
		this.outcomes = outcomes;

		this.updateTotalIncome();
		this.updateTotalOutcome();
	}

	// Method
	// C
	add(record: IncomeTransactionRecord | OutcomeTransactionRecord) {
		const { category, type, month } = record.value;
		if (month !== this.month) return;

		if (type === 'income') this.addIncome(record as IncomeTransactionRecord);
		if (type === 'outcome') this.addOutcome(record as OutcomeTransactionRecord);

		this.updateTotalIncome();
		this.updateTotalOutcome();
	}
	addIncome(record: IncomeTransactionRecord) {
		const { category, type, year, month, ...rest } = record.value;

		let group = this.incomes.find((g) => g.category === category);

		if (!group) {
			group = new CategoryRecord(category, []);
			this.incomes.push(group);
		}

		group.add(rest);
	}
	addOutcome(record: OutcomeTransactionRecord) {
		const { category, type, year, month, ...rest } = record.value;

		let group = this.outcomes.find((g) => g.category === category);

		if (!group) {
			group = new CategoryRecord(category, []);
			this.outcomes.push(group);
		}

		group.add(rest);
	}
	// R
	// U
	override updateTotalIncome() {
		this.totalIncome = this.incomes.reduce(
			(sum, cat) =>
				sum + cat.transactions.reduce((acc, t) => acc + (t.amount || 0), 0),
			0
		);
	}
	override updateTotalOutcome() {
		this.totalOutcome = this.outcomes.reduce(
			(sum, cat) =>
				sum + cat.transactions.reduce((acc, t) => acc + (t.amount || 0), 0),
			0
		);
	}
	//  D
	//  S
}

export class MonthlyTransactionRecord extends BaseMonthlyTransactionRecord {
	readonly year: number;

	protected constructor(
		year: number,
		month: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = []
	) {
		super(year, month, incomes, outcomes);
		this.year = year;
	}
}

export class MonthlyTransactionSimplifiedRecord extends BaseMonthlyTransactionRecord {
	constructor(
		year: number,
		month: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = []
	) {
		super(year, month, incomes, outcomes);
	}
}
