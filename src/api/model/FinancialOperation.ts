// Import

// Class
export abstract class FinancialOperation {
	protected totalIncome: number = 0;
	protected totalOutcome: number = 0;

	get getTotalIncome() {
		return this.totalIncome;
	}
	get getTotalOutcome() {
		return this.totalOutcome;
	}

	abstract updateTotalIncome(): void;
	abstract updateTotalOutcome(): void;
}
