import { FinancialOperation } from '@/controllers/FinancialOperation';
import { MonthlyTransactionSimplifiedRecord } from '@/models/Month';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@/models/Transaction';

export class YearlyTransactionRecord extends FinancialOperation {
	readonly id: string;
	readonly reportYear: number;
	readonly months: MonthlyTransactionSimplifiedRecord[];

	constructor(reportYear: number) {
		super();
		this.id = `y-${reportYear}`;
		this.reportYear = reportYear;
		this.months = [];
		this.updateTotalIncome();
		this.updateTotalOutcome();
	}

	// Method
	// C
	add(transaction: IncomeTransactionRecord | OutcomeTransactionRecord) {
		if (transaction.reportYear !== this.reportYear) return;

		let currentMonth = this.months.find(
			(m) => m.reportMonth === transaction.reportMonth
		);

		if (!currentMonth) {
			currentMonth = new MonthlyTransactionSimplifiedRecord(
				transaction.reportYear,
				transaction.reportMonth
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
