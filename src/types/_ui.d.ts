import { ApiOptions, ApiPathLabel } from '@/lib/useApi';

export interface DynamicElementProps<T = string> {
	path: T;
	target?: ApiPathLabel;
	option?: ApiOptions;
}
