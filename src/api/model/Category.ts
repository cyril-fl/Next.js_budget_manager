import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from '@api/model/Transaction';

export class CategoryRecord<
	T extends Partial<IncomeTransactionRecord | OutcomeTransactionRecord>,
> {
	category: string;
	transactions: T[];
	total: number = 0;

	constructor(category: string, transactions: T[] = []) {
		this.category = category;
		this.transactions = transactions;
		this.updateTotal();
	}

	// Method
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
	// 	//  D
	// 	//  S
}
