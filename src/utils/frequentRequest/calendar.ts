export const target = 'yearlyCalendar';
export const options = {
	nextCache: {
		revalidate: 60,
		tags: ['calendar'],
	},
};
export interface LocalItem {
	year: number;
	months: number[];
}
