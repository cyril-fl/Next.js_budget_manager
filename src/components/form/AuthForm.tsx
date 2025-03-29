'use client';
// Imports
import { useConsole } from '@/.debug/hooks/useConsole';
import Button from '@/components/global/Button';
import Input from '@/components/global/Input';
import InputPassword from '@/components/global/InputPassword';
import { useApi } from '@/hooks/useApi';
import { useForm } from '@/hooks/useForm';
import { useValidate } from '@/hooks/useValidate';
import { useState } from 'react';

// Define
// eslint-disable-next-line react-hooks/rules-of-hooks
const v = useValidate();
export interface AuthFormTemplate {
	email: string;
	password: string;
}
const AuthFormInitialState = {
	email: '',
	password: '',
};
const AuthFormRules = {
	email: v.email({
		min: 10,
	}),
	password: v.password(),
};
const AuthFormRequired = {
	email: 'Email is required',
	password: 'Password is required',
};

export default function AuthForm() {
	// Data
	const { get } = useApi();
	const Console = useConsole();

	const [isLoading, setIsLoading] = useState(false);
	const { form, errors, isValidate, validate } = useForm<AuthFormTemplate>(
		AuthFormInitialState,
		AuthFormRules,
		AuthFormRequired
	);

	// Methods
	async function handleClick() {
		validate();
		if (!isValidate) return;
		setIsLoading(true);
		try {
			const res = await get('/auth/login', {
				method: 'POST',
				body: {
					email: form.email.value,
					password: form.password.value,
				},
			});

			Console.log(res);
		} catch (e) {
			Console.error(e);
			return;
		} finally {
			setIsLoading(false);
		}
	}
	// Render
	return (
		<form className="w-64 space-y-2">
			<Input
				label="Email"
				type="email"
				trailing
				model={form.email}
				errors={errors.email}
				isLabelError
			/>
			<InputPassword
				label="Password"
				model={form.password}
				errors={errors.password}
				isLabelError
			/>
			<Button
				label="Login"
				type="submit"
				className="mt-2"
				onClick={handleClick}
				block
				leading
				isLoading={isLoading}
			/>
		</form>
	);
}
