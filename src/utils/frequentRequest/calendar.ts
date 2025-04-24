import { Month } from '@types';

export const target = 'calendar';
export const options = {
	fields: ['reportYear', 'monthsIndex'],
	nextCache: {
		revalidate: 60,
		tags: ['calendar'],
	},
};
export interface LocalItem {
	reportYear: number;
	monthsIndex: Month[];
}
