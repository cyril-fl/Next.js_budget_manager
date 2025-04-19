import { FinancialOperation } from '@api/model/FinancialOperation';
import { MonthlyTransactionSimplifiedRecord } from '@api/model/Month';

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
	add(month: MonthlyTransactionSimplifiedRecord) {
		this.months.push(month);

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
