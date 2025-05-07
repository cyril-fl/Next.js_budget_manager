// Import
import { SummaryController } from '../controllers';
import { Transaction } from '../types';

// Define
export type RawRecordM = any;

// Class
export class SummaryMonthly extends SummaryController {
	// readonly year?: number;
	// readonly month?: Month[];
	// readonly transactionCount?: number;
	// readonly totalIncome?: number;
	// readonly totalOutcome?: number;
	// readonly balance?: number;
	// readonly inNoutRatio?: number | null;
	// readonly incomesStats?: any;
	// readonly outcomesStats?: any;

	constructor(records: RawRecordM) {
		super();
		// this.year = records.year;
		// this.month = records.month;
		// this.transactionCount = records.transactionCount;
		// this.balance = this.getBalance(this.totalIncome, this.totalOutcome);
		// this.inNoutRatio = this.getRatio(this.totalIncome, this.totalOutcome);
		// this.incomesStats = this.buildStats(records.incomes);
		// this.outcomesStats = this.buildStats(records.outcomes);
	}

	override buildStats(records?: Transaction[]) {
		/*		if (!records || records.length === 0) return;
		const total = this.getTotal(records);

		const catSum: Record<string, number> = {};
		const monthSum: Record<number, number> = {};
		const txCountByMonth: Record<number, number> = {};

		records.forEach(({ category, amount, month }) => {
			catSum[category] = (catSum[category] || 0) + amount;
			monthSum[month] = (monthSum[month] || 0) + amount;
			txCountByMonth[month] = (txCountByMonth[month] || 0) + 1;
		});

		const amountByCategory = this.getKeyValue(catSum);
		const amountByMonth = this.getKeyValue(monthSum);
		const categoryPercentage = this.getPercentage(amountByCategory, total!);

		return {
			total,
			average: this.getAverage(total, this.month?.length ?? 0),
			transactionCount: records.length,
			topMonth: this.getTop(amountByMonth),
			topCategory: this.getTop(categoryPercentage),
			amountByMonth,
			amountByCategory,
			categoryPercentage,
		};*/
	}
}
