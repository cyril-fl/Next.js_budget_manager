import { ApiOptions, ApiPathLabel } from '@/lib_D/useApi';

export interface DynamicElementProps<T = string> {
	path: T;
	target?: ApiPathLabel;
	option?: ApiOptions;
}
