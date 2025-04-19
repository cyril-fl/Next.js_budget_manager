import { Month, PaymentStatus, ReceiptStatus } from '@types';
import rawData from '../api/mockup/data.json';
import { SheetDataModel } from './model/Sheet';
import {
	IncomeTransactionRecord,
	OutcomeTransactionRecord,
} from './model/Transaction';

// TODO recuperer les data d'une DB
const records = rawData
	.map((r) => {
		if (!r.type) return null;

		const common: [string, string, string, string, number, Month, number] = [
			r.id,
			r.label,
			r.category,
			r.currency,
			r.amount,
			r.reportMonth as Month,
			r.reportYear,
		];

		switch (r.type) {
			case 'income':
				return new IncomeTransactionRecord(
					...common,
					r.status as ReceiptStatus,
					r.date_reception ? new Date(r.date_reception) : undefined
				);
			case 'outcome':
				return new OutcomeTransactionRecord(
					...common,
					r.status as PaymentStatus,
					r.date_due ? new Date(r.date_due) : undefined,
					r.date_payment ? new Date(r.date_payment) : undefined
				);
			default:
				return null;
		}
	})
	.filter(Boolean) as Array<IncomeTransactionRecord | OutcomeTransactionRecord>;

const sheet = new SheetDataModel(records);

export default sheet;
