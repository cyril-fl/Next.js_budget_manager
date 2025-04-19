import { IncomeTransactionModel, OutcomeTransactionModel } from './Flux';

interface MonthIncomeCategory {
	category: string;
	content: IncomeTransactionModel[];
}
interface MonthOutcomeCategory {
	category: string;
	content: OutcomeTransactionModel[];
}
interface MonthTransactions {
	income: MonthIncomeCategory[];
	outcome: MonthOutcomeCategory[];
}

export class MonthTransactionModel {
	readonly year: number;
	readonly month: number;
	readonly transactions: MonthTransactions;

	constructor(
		year: number,
		month: number,
		transactions: MonthTransactions = { income: [], outcome: [] }
	) {
		this.year = year;
		this.month = month;
		this.transactions = transactions;
	}

	// Method
	add(record: IncomeTransactionModel | OutcomeTransactionModel) {
		const { category, type } = record;

		const groupList =
			type === 'income' ? this.transactions.income : this.transactions.outcome;

		let group = groupList.find((g) => g.category === category);

		if (!group) {
			group = { category, content: [] };
			groupList.push(group as any);
		}

		group.content.push(record as any);
	}
}
