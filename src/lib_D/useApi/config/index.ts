import { defaultConfig } from './_default';
import { staticConfig } from './_static';

export * from './_default';
export * from './_static';

export const config = {
	...defaultConfig,
	...staticConfig,
} as const;
