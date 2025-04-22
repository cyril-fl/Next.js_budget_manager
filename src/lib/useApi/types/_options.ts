import { ApiFormula } from './_formula';
import { ApiSortParam } from './_param';

export interface NextCache {
	nextCache?: {
		revalidate?: number | false;
		cache?: 'default' | 'force-cache' | 'no-store';
		tags?: string[];
	};
}

export type ApiOptions = {
	fields?: Array<string>;
	maxRecords?: number;
	pageSize?: number;
	filter?: ApiFormula | string;
	offset?: string;
	sort?: ApiSortParam | ApiSortParam[];
} & NextCache;
