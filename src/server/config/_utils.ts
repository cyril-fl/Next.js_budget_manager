import { RawConfig, StaticConfig } from './types';

export function defineConfig<T extends string | number | symbol = string>(
	config: Partial<RawConfig<T>>
) {
	return config;
}

export function mergeConfigs<T extends string | number | symbol = string>(
	...configs: Array<Partial<RawConfig<T>> | StaticConfig>
): RawConfig<T> & StaticConfig {
	return Object.assign({}, ...configs) as RawConfig<T> & StaticConfig;
}
