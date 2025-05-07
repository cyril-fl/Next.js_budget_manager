export type MongoOperator<T> = {
	$eq?: T;
	$ne?: T;
	$in?: T[];
	$nin?: T[];
	$gt?: T;
	$gte?: T;
	$lt?: T;
	$lte?: T;
};

export type FieldFilter<T> = T | MongoOperator<T>;

export type RecursiveFilter<T = any> = {
	[K in keyof T]?: FieldFilter<T[K]>;
} & {
	$and?: RecursiveFilter<T>[];
	$or?: RecursiveFilter<T>[];
	$nor?: RecursiveFilter<T>[];
	$not?: RecursiveFilter<T>;
};
