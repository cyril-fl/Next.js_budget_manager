export type ApiSortParam = {
	field: string;
	direction?: 'asc' | 'desc';
};

export type ApiParam = Record<string, string | undefined>;
