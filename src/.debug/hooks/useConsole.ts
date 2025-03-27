// noinspection JSUnusedGlobalSymbols
import { ConsoleLevel } from '../types';

export function useConsole() {
	const isProd = process.env.next_env === 'production';

	function logMessage<T = string | undefined>(
		level: ConsoleLevel,
		message: string | unknown,
		value?: unknown | unknown[],
		resolve?: T
	) {
		if (!isProd) {
			const isArray = Array.isArray(value);

			const _v = isArray ? value : [value];
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			value ? console[level](message, ..._v) : console[level](message);
		}

		return resolve;
	}

	return {
		error: <T = string | undefined>(
			message: string | unknown,
			value?: unknown | unknown[],
			resolve?: T
		) => logMessage('error', message, value, resolve),

		warn: <T = string | undefined>(
			message: string,
			value?: unknown | unknown[],
			resolve?: T
		) => logMessage('warn', message, value, resolve),

		log: <T = string | undefined>(
			message: string | unknown,
			value?: unknown | unknown[],
			resolve?: T
		) => logMessage('log', message, value, resolve),
	};
}
