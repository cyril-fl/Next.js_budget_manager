import { PrivateLabels, PublicLabels } from '@/server/config';
import { ApiSortParam } from './_param';

export type ApiEndpoint = PublicLabels | PrivateLabels;

export type ApiResponse<T = unknown> = {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
};

export type ApiRequestOptions = {
	fields?: Array<string>;
	filter?: string;
	limit?: number;
	offset?: number;
	pageSize?: number;
	sort?: ApiSortParam | ApiSortParam[];
} & NextCache;

export interface NextCache {
	nextCache?: {
		revalidate?: number | false;
		cache?: 'default' | 'force-cache' | 'no-store';
		tags?: string[];
	};
}
