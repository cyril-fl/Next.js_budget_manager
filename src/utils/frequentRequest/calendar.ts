import { ApiEndpoint } from '@/server/utilsApi';

export const target: ApiEndpoint = 'calendar';
export const options = {
	sort: [
		{
			field: 'year',
			order: 'desc',
		},
	],
	nextCache: {
		revalidate: 60,
		tags: ['calendar'],
	},
};
export interface LocalItem {
	year: number;
	months: number[];
}
