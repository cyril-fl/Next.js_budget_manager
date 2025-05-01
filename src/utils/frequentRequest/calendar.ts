import { CalendarRecord } from '@/models/Calendar';

export const target = 'calendar';
export const options = {
	fields: ['year', 'months'],
	nextCache: {
		revalidate: 60,
		tags: ['calendar'],
	},
};
export type LocalItem = Omit<CalendarRecord, 'detailedMonth'>;
