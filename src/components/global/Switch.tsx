'use client';
// Import
import { Icon } from '@iconify/react';
import * as RdxSwitch from '@radix-ui/react-switch';
import { utilsIcons } from '@utils/utilsIcons';
import { useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

// UI
const theme = tv({
	slots: {
		wrapper: 'flex items-center justify-between space-x-2',
		base: 'relative flex items-center rounded-full  cursor-pointer shrink-0',
		label: '',
		thumb: 'z-10 block rounded-full bg-white shadow-sm transition-transform ',
		leadingIcon:
			'absolute shrink-0 inset-y-0 my-auto flex items-center justify-center ',
		trailingIcon:
			'absolute shrink-0 inset-y-0 my-auto flex items-center justify-center ',
	},
	variants: {
		color: {
			neutral: {
				base: 'bg-gray-300 transition-colors data-[state=checked]:bg-green-500',
			},
			primary: {
				base: 'bg-gray-300 transition-colors data-[state=checked]:bg-grayscale-900',
				leadingIcon: 'text-grayscale-50',
				trailingIcon: '',
			},
			secondary: '',
			error: '',
			info: '',
			success: '',
			warning: '',
		},
		size: {
			xs: {
				base: 'h-3 w-5',
				thumb:
					'size-2.5 translate-x-[1px] data-[state=checked]:translate-x-[9px]',
				leadingIcon: 'left-0.5 size-1.5',
				trailingIcon: 'right-0.5 size-1.5',
			},
			sm: {
				base: 'h-4 w-7',
				thumb:
					'size-3 translate-x-[2px] data-[state=checked]:translate-x-[14px]',
				leadingIcon: 'left-1 size-2',
				trailingIcon: 'right-1 size-2',
			},
			md: {
				base: 'h-5 w-9',
				thumb:
					'size-4.5 translate-x-[1px] data-[state=checked]:translate-x-[17px]',
				leadingIcon: 'left-1 size-3',
				trailingIcon: 'right-1 size-3',
			},
			lg: {
				base: 'h-6 w-10.5',
				thumb:
					'size-5 translate-x-[3px] data-[state=checked]:translate-x-[19px]',
				leadingIcon: 'left-1 size-3',
				trailingIcon: 'right-1 size-3',
			},
			xl: {
				base: 'h-7 w-12',
				thumb:
					'size-6 translate-x-[3px] data-[state=checked]:translate-x-[21px]',
				leadingIcon: 'left-1 size-3.5',
				trailingIcon: 'right-1 size-3.5',
			},
		},
		truncate: {
			true: {
				label: 'truncate',
			},
		},
	},
	defaultVariants: {
		color: 'neutral',
		size: 'xl',
	},
});

// Define
export type RdxSwitchwitchVariants = VariantProps<typeof theme>;
export interface RdxSwitchwitchProps {
	label?: string;
	noLabel?: boolean;
	id?: string;
	defaultValue?: boolean;
	onValueChange?: (value: boolean) => void;
	leadingIcon?: string;
	trailingIcon?: string;
	hasIcon?: boolean;
	leadingLabel?: boolean;
	trailingLabel?: boolean;
	className?: string;
	ui?: Partial<typeof theme.slots>;
	color?: RdxSwitchwitchVariants['color'];
	size?: RdxSwitchwitchVariants['size'];
	truncate?: boolean;
}

export default function RdxSwitchwitch(props: RdxSwitchwitchProps) {
	// Data
	const icon = utilsIcons();

	const ui = useMemo(
		() =>
			theme({
				color: props.color,
				size: props.size,
				truncate: props.truncate,
			}),
		[props]
	);

	// Methods
	function renderIcon(position: 'leading' | 'trailing') {
		if (!props.hasIcon) return null;

		const isLeading = position === 'leading';
		const iconValue = isLeading
			? (props.leadingIcon ?? icon.on)
			: (props.trailingIcon ?? icon.off);
		const className = isLeading
			? ui.leadingIcon({ className: props.ui?.leadingIcon })
			: ui.trailingIcon({ className: props.ui?.trailingIcon });

		return (
			<div className={className}>
				<Icon icon={iconValue} />
			</div>
		);
	}

	// Render
	const Label = !props.noLabel && (
		<label
			className={ui.label({ className: props.ui?.label })}
			htmlFor={props.id}
		>
			{props.label}
		</label>
	);

	return (
		<div
			className={ui.wrapper({
				className: [props.className, props.ui?.wrapper],
			})}
		>
			{(props.leadingLabel || !props.trailingLabel) && Label}
			<RdxSwitch.Root
				id={props.id}
				className={ui.base({ className: props.ui?.base })}
				defaultChecked={props.defaultValue}
				onCheckedChange={props.onValueChange}
			>
				{renderIcon('leading')}
				<RdxSwitch.Thumb className={ui.thumb({ className: props.ui?.thumb })} />
				{renderIcon('trailing')}
			</RdxSwitch.Root>
			{props.trailingLabel && Label}
		</div>
	);
}
