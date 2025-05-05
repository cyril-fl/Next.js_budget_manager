import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from './Transaction';

export class CategoryRecord<
	T extends Partial<IncomeTransactionRecord | OutcomeTransactionRecord>,
> {
	readonly category: string;
	readonly transactions: T[];
	protected total: number = 0;

	public constructor(category: string, transactions: T[] = []) {
		this.category = category;
		this.transactions = transactions;
		this.updateTotal();
	}

	// C
	add(record: T) {
		this.transactions.push(record);
		this.updateTotal();
	}
	// R
	// U
	updateTotal() {
		this.total = this.transactions.reduce(
			(acc, curr) => acc + (curr?.amount || 0),
			0
		);
	}
	//  D
	//  S
}
