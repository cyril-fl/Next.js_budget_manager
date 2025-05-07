import { RecursiveFilter } from '@/server/utilsApi';
import { OptionKeys } from '../../config';

export type ApiParam = Partial<Record<OptionKeys, string>>;

export type ApiEncodedParams<T = object> = {
	fields?: Array<string>;
	filter?: RecursiveFilter<T>;
	limit?: number;
	offset?: number;
	sort?: ApiSortParam | ApiSortParam[];
} & NextCache;

export interface ApiDecodedParams<T = any> {
	fields?: Record<string, 1 | 0>;
	filter?: RecursiveFilter<T>;
	limit?: number;
	offset?: number;
	sort?: Record<string, 1 | -1>;
}

export interface NextCache {
	nextCache?: {
		revalidate?: number | false;
		cache?: 'default' | 'force-cache' | 'no-store';
		tags?: string[];
	};
}

export type ApiSortParam = {
	field: string;
	direction?: 'asc' | 'desc';
};
