import { Month, PaymentStatus, ReceiptStatus } from '../../types';

abstract class BaseFluxDataModel {
	readonly id: string;
	readonly label: string;
	readonly category: string;
	amount: number;
	reportMonth: Month;
	reportYear: number;

	protected constructor(
		id: string,
		label: string,
		category: string,
		amount: number,
		reportMonth: Month,
		reportYear: number
	) {
		this.id = id;
		this.label = label;
		this.category = category;
		this.amount = amount;
		this.reportMonth = reportMonth;
		this.reportYear = reportYear;
	}
}

export class OutcomeFluxDataModel extends BaseFluxDataModel {
	readonly type = 'outcome' as const;
	readonly status?: PaymentStatus;
	date_due?: Date;
	date_payment?: Date;

	constructor(
		id: string,
		label: string,
		category: string,
		amount: number,
		reportMonth: Month,
		reportYear: number,
		status?: PaymentStatus,
		date_due?: Date,
		date_payment?: Date
	) {
		super(id, label, category, amount, reportMonth, reportYear);
		this.status = status;
		this.date_due = date_due;
		this.date_payment = date_payment;
	}
}

export class IncomeFluxDataModel extends BaseFluxDataModel {
	readonly type = 'income' as const;
	readonly status?: ReceiptStatus;
	date_reception?: Date;

	constructor(
		id: string,
		label: string,
		category: string,
		amount: number,
		reportMonth: Month,
		reportYear: number,
		status?: ReceiptStatus,
		date_reception?: Date
	) {
		super(id, label, category, amount, reportMonth, reportYear);
		this.status = status;
		this.date_reception = date_reception;
	}
}
