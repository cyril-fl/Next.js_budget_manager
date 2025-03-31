'use client';
// Imports
import Input, { InputProps } from '@/components/global/Input';
import { utilsIcons } from '@utils/utilsIcons';
import React from 'react';

// Define

export default function InputPassword<T extends object, K extends keyof T>(
	props: InputProps<T, K>
) {
	// Data
	const icons = utilsIcons();
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	// Methods

	// Render
	return (
		<Input
			label={props.label}
			type={isPasswordVisible ? 'text' : 'password'}
			icon={isPasswordVisible ? icons.eyeOff : icons.eyeOn}
			trailing
			model={props.model}
			errors={props.errors}
			onTrailingClick={() => setIsPasswordVisible(!isPasswordVisible)}
			isLabelError={props.isLabelError}
		/>
	);
}
