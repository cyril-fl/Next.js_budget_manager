import { PAYMENT_STATUS } from './constant';

export type PaymentStatus = (typeof PAYMENT_STATUS)[number];

export interface SheetYear {
	year: number;
	months: SheetMonth[];
}

export interface SheetMonth {
	month: number;
	income: FluxCat[];
	expense: FluxCat[];
}

export interface FluxCat {
	id: string;
	category: string;
	flux: Flux[];
}

export interface Flux {
	id: string;
	amount: number;
	date_due?: string;
	date_payment?: string;
	date_reception?: string;
	name: string;
	status?: PaymentStatus;
}
