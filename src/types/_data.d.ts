const RECEIPT_STATUS = ['received', 'pending', 'expected'] as const;
const PAYMENT_STATUS = ['paid', 'pending', 'overdue'] as const;
const FLUX_TYPES = ['income', 'outcome'] as const;
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export type FluxType = (typeof FLUX_TYPES)[number];
export type ReceiptStatus = (typeof RECEIPT_STATUS)[number];
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
export type Month = (typeof MONTHS)[number];

interface BaseFlux {
	id: string;
	label: string;
	category: string;
	amount: number;
	month: Month;
	year: number;
}

interface OutcomeFlux extends BaseFlux {
	type: 'outcome';
	status?: PaymentStatus;
	date_due?: Date;
	date_payment?: Date;
}

interface IncomeFlux extends BaseFlux {
	type: 'income';
	status?: ReceiptStatus;
	date_reception?: Date;
}

type Flux = OutcomeFlux | IncomeFlux;
