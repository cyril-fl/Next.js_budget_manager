import type { Config } from './config';
import raw from './config.json';

export const config: Config =
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	raw[process.env.NEXT_ENV || 'development'] as const;
