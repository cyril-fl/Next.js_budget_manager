import { OptionKeys } from '../../config';

export type ApiParam = Partial<Record<OptionKeys, string>>;

export type ApiSortParam = {
	field: string;
	direction?: 'asc' | 'desc';
};

export interface ApiDecodedParams {
	limit?: number;
	offset?: number;
	fields?: Record<string, 1 | 0>;
	filter?: Record<string, any>;
	sort?: Record<string, 1 | -1>;
}
