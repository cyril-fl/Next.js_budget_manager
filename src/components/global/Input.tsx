'use client';
// Imports
import { FormField } from '@/types';
import { FieldType } from '@core';
import { Icon, IconifyIcon } from '@iconify/react';
import { emitsClick } from '@utils/emits';
import { utilsIcons } from '@utils/utilsIcons';
import React, { useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

// UI
export const theme = tv({
	slots: {
		wrapper: '',
		label: '',
		base: 'flex items-center justify-between relative  ',
		icon: 'flex items-center shrink-0',
		input:
			'focus:outline-none focus:ring-0 focus:border-0 bg-transparent w-full ',
		errors: '',
	},
	variants: {
		color: {
			neutral: '',
			primary: '',
			secondary: '',
			error: '',
			info: '',
			success: '',
			warning: '',
		},
		size: {
			xs: {
				label: 'text-xs font-normal space-x-1',
				base: 'space-x-0.5 px-1 py-0.5 rounded-sm ring-1',
				input: 'text-xs',
				icon: 'text-xs',
				errors: 'text-2xs mt-1',
			},
			sm: {
				label: 'text-xs font-normal space-x-1',
				base: 'space-x-1 px-2 py-0.5 rounded-sm ring-1',
				input: 'text-sm',
				icon: 'text-sm',
				errors: 'text-2xs mt-1',
			},
			md: {
				label: 'text-sm font-medium space-x-1.5',
				base: 'space-x-2 px-2 py-1 rounded-md ring-1',
				errors: 'text-xs mt-1',
			},
			lg: {
				label: 'text-base font-medium space-x-1.5',
				base: 'space-x-2 px-3 py-1.5 rounded-lg ring-1',
				input: 'text-lg',
				errors: 'text-sm mt-1',
			},
			xl: {
				label: 'text-base font-medium space-x-1.5',
				base: 'space-x-3 px-3 py-3 rounded-lg ring-1',
				input: 'text-xl',
				errors: 'text-sm mt-1',
			},
		},
		variant: {
			ghost: '',
			nude: '',
			outline: '',
			solid: '',
		},
		fit: {
			true: 'w-fit',
		},
		focus: {
			true: '',
		},
		hover: {
			true: '',
		},
		loading: {
			true: {
				icon: 'animate-spin',
			},
		},
	},
	compoundVariants: [
		{
			variant: 'solid',
			color: 'neutral',
			className: {
				label: 'text-gray-500 dark:text-gray-200',
				base: 'bg-gray-100 dark:bg-gray-900 dark:text-white ring-transparent',
				errors: 'text-red-500',
			},
		},
		{
			color: 'neutral',
			hover: true,
			className: 'ring-gray-800',
		},
		{
			color: 'neutral',
			focus: true,
			className: 'ring-gray-400',
		},
		{
			color: 'neutral',
			hover: true,
			focus: true,
			className: 'ring-gray-800/80',
		},
		{
			variant: 'solid',
			color: 'primary',
			className: {
				label: 'text-grayscale-500 dark:text-grayscale-200',
				base: 'bg-grayscale-100 dark:bg-grayscale-900 text-grayscale-500 dark:text-white ring-transparent',
				errors: 'text-red-500',
			},
		},
		{
			color: 'primary',
			hover: true,
			className: 'ring-grayscale-400',
		},
		{
			color: 'primary',
			focus: true,
			className: 'ring-grayscale-900',
		},
		{
			color: 'primary',
			hover: true,
			focus: true,
			className: 'ring-grayscale-900',
		},
	],
	defaultVariants: {
		variant: 'solid',
		color: 'primary',
		size: 'md',
	},
});

// Define
type HtmlInputDefault = string | number | readonly string[] | undefined;
export type InputVariants = VariantProps<typeof theme>;
export interface InputProps<T extends object, K extends keyof T>
	extends InputEmit {
	id?: string;
	errors?: FormField<T, K>;
	disabled?: boolean;
	label?: string;
	model?: FormField<T, K>;
	noLabel?: boolean;
	placeholder?: string;
	required?: boolean;
	type?: FieldType;
	icon?: string;
	leading?: boolean;
	trailing?: boolean;
	isFocused?: boolean;
	isLabelError?: boolean;
	isLoading?: boolean;
	isHovered?: boolean;
	sizeFit?: boolean;
	className?: string;
	ui?: Partial<typeof theme.slots>;
	color?: InputVariants['color'];
	size?: InputVariants['size'];
	variant?: InputVariants['variant'];
}
interface InputEmit {
	onLeadingClick?: <T = unknown>(
		e: React.MouseEvent<HTMLButtonElement>
	) => T | void;
	onTrailingClick?: <T = unknown>(
		e: React.MouseEvent<HTMLButtonElement>
	) => T | void;
}

export default function Input<T extends object, K extends keyof T>(
	props: InputProps<T, K>
) {
	// Data
	const icons = utilsIcons();

	const [isHovered, setIsHovered] = React.useState(props.isHovered);
	const [isFocus, setIsFocus] = React.useState(props.isFocused);

	const id = useMemo(
		() => props.id ?? props.label?.replace(/\s+/g, '_').toLowerCase(),
		[props.id, props.label]
	);
	const iconName = useMemo(
		(): string | IconifyIcon =>
			props.isLoading && props.icon ? icons.loading : (props.icon ?? ''),
		[icons.loading, props.icon, props.isLoading]
	);
	const ui = useMemo(
		() =>
			theme({
				color: props.color,
				size: props.size,
				variant: props.variant,
				fit: props.sizeFit,
				focus: isFocus,
				loading: props.isLoading,
				hover: isHovered,
			}),
		[
			props.color,
			props.size,
			props.variant,
			props.sizeFit,
			props.isLoading,
			isFocus,
			isHovered,
		]
	);

	// Methods
	const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		props.leading && emitsClick(e, { onClick: props.onLeadingClick });
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		props.trailing && emitsClick(e, { onClick: props.onTrailingClick });
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.model?.set(e.target.value as T[K]);
	};

	// Render
	const Label = props.label && !props.noLabel && (
		<label htmlFor={id} className={ui.label({ className: props.ui?.label })}>
			<span>{props.label}</span>
			{props.isLabelError && props.errors && (
				<span className={ui.errors()}>{props.errors.value as string}</span>
			)}
		</label>
	);

	const Error = props.errors && !props.isLabelError && (
		<span className={ui.errors()}>{props.errors.value as string}</span>
	);

	const IconElement = props.icon && (
		<button
			type="button"
			onClick={(e) => handleIconClick(e)}
			className={ui.icon({ className: props.ui?.icon })}
		>
			<Icon icon={iconName} />
		</button>
	);

	return (
		<div className={ui.wrapper({ className: props.ui?.wrapper })}>
			{Label}
			<div
				className={ui.base({ className: [props.className, props.ui?.base] })}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{props.leading && IconElement}
				<input
					id={id}
					disabled={props.disabled}
					placeholder={props.placeholder}
					required={props.required}
					type={props.type}
					defaultValue={props.model?.value as HtmlInputDefault}
					className={ui.input({ className: props.ui?.input })}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					onInput={handleInput}
				/>
				{props.trailing && IconElement}
			</div>
			{Error}
		</div>
	);
}
