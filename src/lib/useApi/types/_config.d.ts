import { config } from '@/lib/useApi';

export type ApiPathLabel = (typeof config.pathLabel)[number];

export type ApiResponse<T = unknown> = {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
};
