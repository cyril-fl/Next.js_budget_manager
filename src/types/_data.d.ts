const PAYMENT_STATUS = ['paid', 'pending', 'overdue'] as const;

type PaymentStatus = (typeof PAYMENT_STATUS)[number];

interface SheetYear {
	year: number;
	months: unknown[];
}

interface SheetMonth {
	month: number;
	income: FluxCat[];
	expense: FluxCat[];
}

interface FluxCat {
	id: string;
	category: string;
	flux: Flux[];
}

interface Flux {
	id: string;
	amount: number;
	date_due?: string;
	date_payment?: string;
	date_reception?: string;
	name: string;
	status?: PaymentStatus;
}
