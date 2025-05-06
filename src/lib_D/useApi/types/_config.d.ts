import { config } from '@/lib_D/useApi';

export type ApiPathLabel = (typeof config.path.labels)[number];

export type ApiResponse<T = unknown> = {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
};
