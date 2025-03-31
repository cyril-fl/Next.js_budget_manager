import { API_OPTIONS_KEYS, API_TABLE } from '@/types/constant';

export type ApiResponse<T = unknown> = {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
};

export type ApiOptions = {
	fields?: Array<string>;
	maxRecords?: number;
	pageSize?: number;
	filter?: string;
	offset?: string;
	sort?: ApiSortParam | ApiSortParam[];
};

export type ApiField = (typeof API_TABLE)[number];
export type ApiOptionsKeys = (typeof API_OPTIONS_KEYS)[number];

export type ApiSortParam = {
	field: string;
	direction?: 'asc' | 'desc';
};
