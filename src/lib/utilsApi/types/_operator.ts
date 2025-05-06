import { config } from '../config';

export type ApiNamedOperator = (typeof config.operator.name)[number];
export type ApiSymbolOperator = (typeof config.operator.symbol)[number];
