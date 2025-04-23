// Import
import { Month, PaymentStatus, ReceiptStatus } from '@types';

// Class
abstract class TransactionRecord {
	readonly id: string;
	protected label: string;
	protected category: string;
	readonly currency: string;
	protected rawAmount: number;
	readonly reportMonth: Month;
	readonly reportYear: number;

	protected constructor(
		id: string,
		label: string,
		category: string,
		currency: string,
		amount: number,
		reportMonth: Month,
		reportYear: number
	) {
		this.id = id;
		this.label = label;
		this.category = category;
		this.currency = currency;
		this.rawAmount = amount;
		this.reportMonth = reportMonth;
		this.reportYear = reportYear;
	}

	get amount() {
		// TODO: add currency conversion
		return this.rawAmount;
	}
}

export class OutcomeTransactionRecord extends TransactionRecord {
	readonly type = 'outcome' as const;
	protected status?: PaymentStatus;
	protected dateDue?: Date;
	protected datePayment?: Date;

	constructor(
		id: string,
		label: string,
		category: string,
		currency: string,
		amount: number,
		reportMonth: Month,
		reportYear: number,
		status?: PaymentStatus,
		dateDue?: Date,
		datePayment?: Date
	) {
		super(id, label, category, currency, amount, reportMonth, reportYear);
		this.status = status;
		this.dateDue = dateDue;
		this.datePayment = datePayment;
	}
	// Getters & Setters
	get value() {
		return {
			id: this.id,
			label: this.label,
			type: this.type,
			category: this.category,
			currency: this.currency,
			amount: this.amount,
			reportMonth: this.reportMonth,
			reportYear: this.reportYear,
			status: this.status,
			dateDue: this.dateDue,
			datePayment: this.datePayment,
		};
	}

	get date() {
		return [this?.dateDue, this?.datePayment].filter(Boolean) as Date[];
	}
}

export class IncomeTransactionRecord extends TransactionRecord {
	readonly type = 'income' as const;
	protected status?: ReceiptStatus;
	protected dateReception?: Date;

	constructor(
		id: string,
		label: string,
		category: string,
		currency: string,
		amount: number,
		reportMonth: Month,
		reportYear: number,
		status?: ReceiptStatus,
		dateReception?: Date
	) {
		super(id, label, category, currency, amount, reportMonth, reportYear);
		this.status = status;
		this.dateReception = dateReception;
	}

	// Method
	// C
	// R
	// Getters & Setters
	get value() {
		return {
			id: this.id,
			label: this.label,
			type: this.type,
			category: this.category,
			currency: this.currency,
			amount: this.amount,
			reportMonth: this.reportMonth,
			reportYear: this.reportYear,
			status: this.status,
			dateReception: this.dateReception,
		};
	}

	get date() {
		return [this?.dateReception].filter(Boolean) as Date[];
	}
	// U
	// D
	// S
}
