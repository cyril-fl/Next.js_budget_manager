import { defineConfig } from '@/server/config/_utils';

const LABELS = [
	'auth',
	'calendar',
	'months',
	'monthlySummary',
	'transactions',
	'years',
	'yearlySummary',
] as const;
type Labels = typeof LABELS[number];

const config = defineConfig<Labels>({
	// TODO Mettre un process.env qqelque par 
	bearer: 'cyril-f-test',
	// TODO Mettre un process.env qqelque par 
	mongo: {
		url: 'mongodb://cyril-fl:1963@localhost:27017/compta_app?authSource=admin',
		name:  'compta_app',
	},
	path: {
		labels: [...LABELS],
		routes: {
			auth: 'auth',
			transactions: 'transactions',
			months: 'months',
			monthlySummary: 'summary/months',
			years: 'years',
			yearlySummary: 'summary/years',
			calendar: 'calendar',
		},
	},
})
export default config;