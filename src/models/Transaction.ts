// Import
import {
	Day,
	Month,
	PaymentStatus,
	ReceiptStatus,
	TransactionType,
} from '@types';

// Class
export abstract class TransactionRecord {
	readonly id: string;
	readonly type: TransactionType;
	protected label: string;
	readonly category: string;
	readonly currency: string;
	protected rawAmount: number;
	readonly month: Month;
	readonly year: number;

	protected constructor(
		id: string,
		type: TransactionType,
		label: string,
		category: string,
		currency: string,
		amount: number,
		month: Month,
		year: number
	) {
		this.id = id;
		this.type = type;
		this.label = label;
		this.category = category;
		this.currency = currency;
		this.rawAmount = amount;
		this.month = month;
		this.year = year;
	}

	get amount() {
		// TODO: add currency conversion
		return this.rawAmount;
	}
}

export class OutcomeTransactionRecord extends TransactionRecord {
	protected status?: PaymentStatus;
	protected dayDue?: Day;
	protected dayPayment?: Day;

	public constructor(
		id: string,
		label: string,
		category: string,
		currency: string,
		amount: number,
		month: Month,
		year: number,
		status?: PaymentStatus,
		dayDue?: Day,
		dayPayment?: Day
	) {
		super(id, 'outcome', label, category, currency, amount, month, year);
		this.status = status;
		this.dayDue = dayDue;
		this.dayPayment = dayPayment;
	}
	//C
	// R
	get value() {
		return {
			id: this.id,
			label: this.label,
			type: this.type,
			category: this.category,
			currency: this.currency,
			amount: this.amount,
			month: this.month,
			year: this.year,
			status: this.status,
			dayDue: this.dayDue,
			dayPayment: this.dayPayment,
		};
	}

	get date() {
		const dateDue = new Date(this.year, this.month, this.dayDue);
		const datePayment = new Date(this.year, this.month, this.dayPayment);

		console.log('get date: dateDue', dateDue);
		console.log('get date: datePayment', datePayment);
		return [dateDue, datePayment];
	}
	// U
	// D
	// S
}

export class IncomeTransactionRecord extends TransactionRecord {
	protected status?: ReceiptStatus;
	protected dayReception?: Day;

	public constructor(
		id: string,
		label: string,
		category: string,
		currency: string,
		amount: number,
		month: Month,
		year: number,
		status?: ReceiptStatus,
		dayReception?: Day
	) {
		super(id, 'income', label, category, currency, amount, month, year);
		this.status = status;
		this.dayReception = dayReception;
	}

	// C
	// R
	get value() {
		return {
			id: this.id,
			label: this.label,
			type: this.type,
			category: this.category,
			currency: this.currency,
			amount: this.amount,
			month: this.month,
			year: this.year,
			status: this.status,
			dayReception: this.dayReception,
		};
	}

	get date() {
		const dateReception = new Date(this.year, this.month, this.dayReception);

		console.log('get date: dateReception', dateReception);
		return [dateReception];
	}
	// U
	// D
	// S
}
