import { FormAction, FormField } from '@/types';
import { useCallback, useMemo, useReducer, useState } from 'react';
import { z, ZodError, ZodType } from 'zod';

export function useForm<T extends object>(
	initialState: T,
	rules: Partial<Record<keyof T, ZodType<unknown>>> = {},
	required: Partial<Record<keyof T, string>> = {}
) {
	// Data
	const schema = useMemo(
		() =>
			z.object(
				Object.fromEntries(
					Array.from(
						new Set([...Object.keys(rules), ...Object.keys(required)])
					).map((key) => {
						const validator = rules[key as keyof T];
						const message = required[key as keyof T];

						console.log('key', key);
						if (!message) return [key, validator ?? z.any()];

						const refinedValidator = (validator ?? z.string()).refine(
							(value) => value !== undefined && value !== null && value !== '',
							{ message }
						);

						return [key, refinedValidator];
					})
				) as Record<string, ZodType>
			),
		[required, rules]
	);

	const formReducer = useMemo(
		() =>
			(state: T, action: FormAction<T>): T => {
				switch (action.type) {
					case 'CLEAR':
						return Object.keys(initialState).reduce((acc, key) => {
							acc[key as keyof T] = '' as T[keyof T];
							return acc;
						}, {} as T);

					case 'RESET':
						return { ...initialState };

					case 'SET_FIELD':
						if (!action.payload) return state;
						return {
							...state,
							[action.payload.field]: action.payload.value,
						};

					default:
						return state;
				}
			},
		[initialState]
	);

	const [formValue, formDispatch] = useReducer(formReducer, initialState);

	const form = Object.fromEntries(
		Object.keys(formValue).map((key) => {
			const field = key as keyof typeof formValue;
			return [
				field,
				{
					value: formValue[field],
					set: (value: T[keyof T]) => {
						formDispatch({ type: 'SET_FIELD', payload: { field, value } });
					},
				} as FormField<T, keyof T>,
			];
		})
	);

	const errorReducer = useMemo(
		() =>
			(
				state: Partial<Record<keyof T, string>>,
				action: FormAction<T>
			): Partial<Record<keyof T, string>> => {
				switch (action.type) {
					case 'SET_FIELD':
						if (!action.payload) return state;
						return {
							...state,
							[action.payload.field]: action.payload.value,
						};
					case 'RESET':
						return {} as Record<keyof T, string>;
					default:
						return state;
				}
			},
		[]
	);

	const [errorsValue, errorsDispatch] = useReducer(
		errorReducer,
		{} as Record<keyof T, string>
	);

	const errors = Object.fromEntries(
		Object.keys(errorsValue).map((key) => {
			const field = key as keyof typeof errorsValue;
			return [
				field,
				{
					value: errorsValue[field],
					set: (value: string) => {
						errorsDispatch({ type: 'SET_FIELD', payload: { field, value } });
					},
				},
			];
		})
	);

	const [isValidate, setIsValidate] = useState<boolean>(false);
	const isAnyChanged = useMemo(
		() =>
			Object.keys(form).some(
				(key) => formValue[key as keyof T] !== initialState[key as keyof T]
			),
		[form, formValue, initialState]
	);

	// Methods
	const validate = useCallback(() => {
		errorsDispatch({ type: 'RESET' });
		try {
			const validatedData = schema.parse(formValue);
			Object.entries(validatedData).forEach(([key, value]) => {
				form[key].set(value);
			});
			setIsValidate(true);
			return true;
		} catch (error) {
			if (error instanceof ZodError) {
				error.errors.forEach((err) => {
					const field = err.path[0] as keyof T;
					errorsDispatch({
						type: 'SET_FIELD',
						payload: { field, value: err.message },
					});
				});
			}
			setIsValidate(false);
			return false;
		}
	}, [errors, form, formValue, schema]);

	function clearForm() {
		formDispatch({ type: 'CLEAR' });
		errorsDispatch({ type: 'RESET' });
		setIsValidate(false);
	}
	function resetForm() {
		formDispatch({ type: 'RESET' });
		errorsDispatch({ type: 'RESET' });
		setIsValidate(false);
	}
	function resetError() {
		errorsDispatch({ type: 'RESET' });
	}
	return {
		errors,
		form,
		validate,
		isValidate,
		isAnyChanged,
		clearForm,
		resetError,
		resetForm,
	};
}
