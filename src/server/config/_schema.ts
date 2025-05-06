import userConfig from './../../../api.config';
import { mergeConfigs } from './_utils';
import {
	METHODS,
	METHODS_BY_CATEGORY,
	OPERATOR_NAME,
	OPERATOR_SYMBOL,
	OPERATOR_SYMBOL_COMPARISON,
	OPTIONS_KEYS,
	PrivateLabels,
	RawConfig,
	StaticConfig,
} from './types';

// Define
export const PUBLIC_LABELS = [...(userConfig.path?.labels ?? [])] as const;
export type PublicLabels = (typeof PUBLIC_LABELS)[number];

// Data
const defaultConfig: Partial<RawConfig<PrivateLabels>> = {
	url: 'http://localhost:3000/api',
	formula: {
		filter: [...METHODS_BY_CATEGORY.filter],
		transform: [...METHODS_BY_CATEGORY.transform],
		array: [...METHODS_BY_CATEGORY.array],
		name: [...METHODS],
	},
};

const staticConfig: StaticConfig = {
	operator: {
		name: [...OPERATOR_NAME],
		symbol: [...OPERATOR_SYMBOL],
		comparisonSymbol: OPERATOR_SYMBOL_COMPARISON,
	},
	options: [...OPTIONS_KEYS],
};

export const config = mergeConfigs<PublicLabels | PrivateLabels>(
	defaultConfig,
	userConfig,
	staticConfig
);
