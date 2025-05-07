import {
	RawRecordM as MonthlyRecord,
	SummaryYearly,
	RawRecordY as YearlyRecord,
} from '../models';

export class SummaryFactory {
	private constructor() {}

	public static yearly(records: YearlyRecord[]) {
		return records.map((record) => new SummaryYearly(record));
	}

	public static monthly(records: MonthlyRecord[]) {
		return records.map((record) => new SummaryYearly(record));
	}
}
