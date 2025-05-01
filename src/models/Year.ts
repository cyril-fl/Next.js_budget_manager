import { FinancialOperation } from '@/controllers/FinancialOperation';
import { MonthlyTransactionSimplifiedRecord } from '@/models/Month';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@/models/Transaction';

export class YearlyTransactionRecord extends FinancialOperation {
	readonly id: string;
	readonly year: number;
	readonly months: MonthlyTransactionSimplifiedRecord[];

	constructor(year: number) {
		super();
		this.id = `y-${year}`;
		this.year = year;
		this.months = [];
		this.updateTotalIncome();
		this.updateTotalOutcome();
	}

	// Method
	// C
	add(transaction: IncomeTransactionRecord | OutcomeTransactionRecord) {
		if (transaction.year !== this.year) return;

		let currentMonth = this.months.find((m) => m.month === transaction.month);

		if (!currentMonth) {
			currentMonth = new MonthlyTransactionSimplifiedRecord(
				transaction.year,
				transaction.month
			);
			this.months.push(currentMonth);
		}

		currentMonth.add(transaction);

		this.updateTotalIncome();
		this.updateTotalOutcome();
	}

	// R
	// U
	override updateTotalIncome() {
		this.totalIncome = this.months.reduce(
			(acc, curr) => acc + curr.getTotalIncome,
			0
		);
	}
	override updateTotalOutcome() {
		this.totalOutcome = this.months.reduce(
			(acc, curr) => acc + curr.getTotalOutcome,
			0
		);
	}
	//  D
	//  S
}
