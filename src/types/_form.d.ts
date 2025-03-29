const FORM_ACTIONS_TYPES = ['CLEAR', 'RESET', 'SET_FIELD'] as const;

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
