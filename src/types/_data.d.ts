import { PAYMENT_STATUS } from './constant';

export type PaymentStatus = (typeof PAYMENT_STATUS)[number];

export interface SheetYear {
	year: number;
	months: SheetMonth[];
}

export interface SheetMonth {
	month: number;
	income: FluxCat[];
	outcome: FluxCat[];
}

export interface FluxCat {
	id: string;
	category: string;
	flux: Flux[];
}

export interface Flux {
	amount: number;
	category: string;
	date_due?: string;
	date_payment?: string;
	date_reception?: string;
	id: string;
	month: number;
	name: string;
	parent_id: string;
	status?: PaymentStatus;
	type: 'income' | 'outcome';
	year: number;
}
