import { FORM_ACTIONS_TYPES } from './constant';

export type FormActionType = (typeof FORM_ACTIONS_TYPES)[number];
export interface FormAction<T = unknown> {
	type: FormActionType;
	payload?: {
		field: keyof T;
		value?: T[keyof T] | string;
	};
}
export type FormField<T, K extends keyof T | string> = {
	value: T[K] | string | undefined;
	set: (value: T[K]) => void;
};
