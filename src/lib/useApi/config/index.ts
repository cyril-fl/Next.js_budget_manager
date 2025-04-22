import type { Config } from './config';

// TODO implementer plus
let moduleConfig: Partial<Config> = {};

export function defineModuleConfig(config: Config) {
	moduleConfig = { ...moduleConfig, ...config };
}

export function getModuleConfig(): Partial<Config> {
	return moduleConfig;
}
