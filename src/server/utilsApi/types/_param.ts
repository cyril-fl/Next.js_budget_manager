import { OptionKeys } from '../../config';

export type ApiParam = Partial<Record<OptionKeys, string>>;

export type ApiSortParam = {
	field: string;
	direction?: 'asc' | 'desc';
};
