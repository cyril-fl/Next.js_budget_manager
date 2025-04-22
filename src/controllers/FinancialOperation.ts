// Import

// Class
// TODO retravailler cette integration vis a vis de category
export abstract class FinancialOperation {
	protected totalIncome: number = 0;
	protected totalOutcome: number = 0;

	get getTotalIncome() {
		this.updateTotalIncome();
		return this.totalIncome;
	}
	get getTotalOutcome() {
		this.updateTotalOutcome();
		return this.totalOutcome;
	}

	abstract updateTotalIncome(): void;
	abstract updateTotalOutcome(): void;
}
