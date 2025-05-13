'use client';
// Imports
import { ButtonType, EmitClick, EmitLink } from '@core';
import { Icon, IconifyIcon } from '@iconify/react';
import { emitsClick, emitsLink } from '@utils/emits';
import { utilsIcons } from '@utils/utilsIcons';
import Link, { LinkProps } from 'next/link';
import React, { JSX, useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

// UI
// TODO Refactor les class pour avoir le minimim
const theme = tv({
	slots: {
		base: 'inline-flex cursor-pointer items-center justify-center transition duration-200 ease-in-out select-none focus:ring-0 focus:outline-none disabled:cursor-default',
		label: 'truncate',
		icon: 'shrink-0',
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
				base: 'space-x-0.5 px-0.5 py-0.5 rounded-sm ring-1',
				icon: 'text-sm',
			},
			sm: {
				label: 'text-xs font-normal space-x-1',
				base: 'space-x-1 px-1.5 py-1 rounded-sm ring-1',
				icon: 'text-base',
			},
			md: {
				label: 'text-sm font-medium space-x-1.5',
				base: 'space-x-2 px-1.5 py-1 rounded border-[2px]',
				icon: 'text-xl',
			},
			lg: {
				label: 'text-lg font-medium space-x-1.5',
				base: 'space-x-2 px-3 py-1.5 rounded-lg ring-1',
				icon: 'text-xl',
			},
			xl: {
				label: 'text-xl font-medium space-x-1.5',
				base: 'space-x-3 px-3 py-3 rounded-lg ring-1',
				icon: 'text-2xl',
			},
		},
		variant: {
			ghost: 'border-transparent',
			nude: 'border-transparent',
			outline: '',
			solid: '',
		},
		block: {
			true: 'w-full',
		},
		focus: {
			true: '',
		},
		hover: {
			true: '',
		},
		loading: {
			true: {
				base: 'cursor-wait disabled:cursor-wait',
				icon: 'animate-spin',
			},
		},
		rounded: {
			true: 'rounded-full',
		},
		squared: {
			true: 'aspect-square',
		},
	},
	compoundVariants: [
		{
			color: 'neutral',
			variant: 'nude',
			hover: true,
			className: '',
		},
		{
			color: 'neutral',
			focus: true,
			className: '',
		},
		{
			color: 'neutral',
			hover: true,
			focus: true,
			className: '',
		},
		{
			color: 'neutral',
			variant: 'solid',
			className: {
				base: `
					bg-grayscale-100 text-grayscale-500 ring-transparent
					active:bg-grayscale-50 active:text-grayscale-300
					disabled:cursor-default disabled:bg-grayscale-200 disabled:text-grayscale-50 disabled:active:bg-grayscale-200 dark:bg-grayscale-900
					dark:text-white dark:active:bg-grayscale-700`,
			},
		},
		{
			color: 'neutral',
			variant: 'solid',
			hover: true,
			className: 'bg-grayscale-300 text-grayscale-500 dark:bg-grayscale-800',
		},
		{
			color: 'neutral',
			variant: 'nude',
			className: {
				base: `
					p-0
					text-grayscale-800 ring-transparent
					hover:text-grayscale-200
					active:text-grayscale-300
					disabled:cursor-default disabled:text-grayscale-50
					`,
			},
		},
		{
			color: 'neutral',
			variant: 'nude',
			hover: true,
			className: 'text-grayscale-700 dark:text-grayscale-700',
		},
		{
			color: 'primary',
			variant: 'solid',
			className: {
				base: `
					ring-transparent
					active:bg-grayscale-50 active:text-grayscale-300
					disabled:cursor-default disabled:bg-grayscale-200 disabled:text-grayscale-50 disabled:active:bg-grayscale-200 bg-grayscale-900
					text-white dark:active:bg-grayscale-700`,
			},
		},
		{
			color: 'primary',
			hover: true,
			className: 'bg-grayscale-800',
		},
		{
			color: 'primary',
			focus: true,
			className: '',
		},
		{
			color: 'primary',
			hover: true,
			focus: true,
			className: '',
		},
		{
			variant: 'ghost',
			color: 'secondary',
			hover: true,
			className: 'border-grayscale-800',
		},
		{
			variant: 'ghost',
			color: 'secondary',
			focus: true,
			className: '',
		},
		{
			variant: 'ghost',
			color: 'secondary',
			hover: true,
			focus: true,
			className: '',
		},
		{
			color: 'secondary',
			variant: 'ghost',
			className: {
				base: `
					active:text-grayscale-200
					active:border-grayscale-200
					`,
			},
		},
	],
	defaultVariants: {
		color: 'neutral',
		size: 'md',
		variant: 'solid',
	},
});

// Define
export type ButtonVariants = VariantProps<typeof theme>;
export interface ButtonProps extends ButtonEmit {
	disabled?: boolean;
	label?: string | JSX.Element;
	noLabel?: boolean;
	type?: ButtonType;
	to?: string | LinkProps['href'];
	icon?: string;
	leading?: boolean;
	trailing?: boolean;
	block?: boolean;
	rounded?: boolean;
	squared?: boolean;
	isFocused?: boolean;
	isLoading?: boolean;
	isHovered?: boolean;
	className?: string;
	ui?: Partial<typeof theme.slots>;
	color?: ButtonVariants['color'];
	size?: ButtonVariants['size'];
	variant?: ButtonVariants['variant'];
}
interface ButtonEmit {
	onClick?: EmitClick | EmitLink;
	preventDefault?: boolean;
}

export default function Button(props: ButtonProps) {
	// Data
	const icons = utilsIcons();

	const [isHovered, setIsHovered] = React.useState(props.isHovered);
	const [isFocus, setIsFocus] = React.useState(props.isFocused);

	const iconName = useMemo((): string | IconifyIcon => {
		if (props.isLoading) return icons.loading;
		if (props.icon) return props.icon;
		return '';
	}, [icons.loading, props.icon, props.isLoading]);

	const ui = useMemo(
		() =>
			theme({
				color: props.color,
				size: props.size,
				variant: props.variant,
				block: props.block,
				rounded: props.rounded,
				squared: props.squared,
				focus: isFocus,
				loading: props.isLoading,
				hover: isHovered,
			}),
		[
			props.color,
			props.size,
			props.variant,
			props.block,
			props.rounded,
			props.squared,
			props.isLoading,
			isFocus,
			isHovered,
		]
	);

	// Methods
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		if (props.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		}
		if (e.currentTarget instanceof HTMLButtonElement)
			emitsClick(e as React.MouseEvent<HTMLButtonElement>, props);
		if (e.currentTarget instanceof HTMLAnchorElement)
			emitsLink(e as React.MouseEvent<HTMLAnchorElement>, props);
	};

	// Render
	const ComponentTag = props.to ? Link : 'button';

	const Label = props.label && !props.noLabel && (
		<span className={ui.label({ className: props.ui?.label })}>
			{props.label}
		</span>
	);

	const IconElement = (
		<div className={ui.icon({ className: props.ui?.icon })}>
			<Icon icon={iconName} />
		</div>
	);
	return (
		<ComponentTag
			className={ui.base({
				className: [props.className, props.ui?.base],
			})}
			disabled={props.disabled}
			type={props.type}
			href={props.to ?? '#'}
			onClick={handleClick}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{props.leading && IconElement}
			{Label}
			{props.trailing && IconElement}
		</ComponentTag>
	);
}
