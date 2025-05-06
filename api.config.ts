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
	path: {
		labels: [...LABELS],
		routes: {
			auth: 'auth',
			calendar: 'calendar',
			months: 'months',
			monthlySummary: 'months/summary',
			transactions: 'transactions',
			years: 'years',
			yearlySummary: 'years/summary',
		},
	},
})
export default config;