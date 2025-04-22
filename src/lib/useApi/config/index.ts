import { Config, defaultConfig } from './_default';
import { staticConfig } from './_static';

let currentConfig: Config = { ...defaultConfig };

export function defineModuleConfig(config: Partial<Config>) {
	currentConfig = { ...currentConfig, ...config };
}

export function getModuleConfig() {
	return currentConfig;
}

export const config = {
	...getModuleConfig(),
	...defaultConfig,
	...staticConfig,
} as const;
