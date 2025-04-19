// Import
import { CategoryRecord } from './Category';
import { FinancialOperation } from './FinancialOperation';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from './Transaction';

// Class
export abstract class BaseMonthlyTransactionRecord extends FinancialOperation {
	readonly id: string;
	readonly reportYear: number;
	readonly reportMonth: number;
	readonly incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [];
	readonly outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = [];

	protected constructor(
		reportYear: number,
		reportMonth: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = []
	) {
		super();

		this.id = `m-${reportYear}-${reportMonth}`;
		this.reportYear = reportYear;
		this.reportMonth = reportMonth;
		this.incomes = incomes;
		this.outcomes = outcomes;

		this.updateTotalIncome();
		this.updateTotalOutcome();
	}

	// Method
	// C
	add(record: IncomeTransactionRecord | OutcomeTransactionRecord) {
		const { category, type } = record.value;

		if (type === 'income')
			this.addIncome(record as IncomeTransactionRecord, category);
		if (type === 'outcome')
			this.addOutcome(record as OutcomeTransactionRecord, category);

		this.updateTotalIncome();
		this.updateTotalOutcome();
	}
	addIncome(record: Partial<IncomeTransactionRecord>, category: string) {
		let group = this.incomes.find((g) => g.category === category);

		if (!group) {
			group = new CategoryRecord(category, []);
			this.incomes.push(group as never);
		}

		group.add(record);
	}
	addOutcome(record: Partial<OutcomeTransactionRecord>, category: string) {
		let group = this.outcomes.find((g) => g.category === category);

		if (!group) {
			group = new CategoryRecord(category, []);
			this.outcomes.push(group as never);
		}

		group.add(record);
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
	reportYear: number;

	constructor(
		reportYear: number,
		reportMonth: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = []
	) {
		super(reportYear, reportMonth, incomes, outcomes);
		this.reportYear = reportYear;
	}
}

export class MonthlyTransactionSimplifiedRecord extends BaseMonthlyTransactionRecord {
	constructor(
		reportYear: number,
		reportMonth: number,
		incomes: CategoryRecord<Partial<IncomeTransactionRecord>>[] = [],
		outcomes: CategoryRecord<Partial<OutcomeTransactionRecord>>[] = []
	) {
		super(reportYear, reportMonth, incomes, outcomes);
	}
}
