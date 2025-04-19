import { FLUX_TYPES, MONTHS, PAYMENT_STATUS, RECEIPT_STATUS } from './constant';

export type FluxType = (typeof FLUX_TYPES)[number];
export type ReceiptStatus = (typeof RECEIPT_STATUS)[number];
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
export type Month = (typeof MONTHS)[number];

export interface BaseFlux {
	id: string;
	label: string;
	category: string;
	amount: number;
	reportMonth: Month;
	reportYear: number;
}

export interface OutcomeFlux extends BaseFlux {
	type: 'outcome';
	status?: PaymentStatus;
	date_due?: Date;
	date_payment?: Date;
}

export interface IncomeFlux extends BaseFlux {
	type: 'income';
	status?: ReceiptStatus;
	date_reception?: Date;
}

export type Flux = OutcomeFlux | IncomeFlux;
