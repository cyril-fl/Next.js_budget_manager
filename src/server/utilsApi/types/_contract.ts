import { PrivateLabels, PublicLabels } from '@/server/config';

export type ApiEndpoint = PublicLabels | PrivateLabels;

export type ApiResponse<T = unknown> = {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
};
