'use client';
// Imports
import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { FieldType } from '../../../.core';

// UI
const theme = tv({
	slots: {
		base: 'w-fit flex',
		label: '',
		input: '',
		errors: 'text-red-500 text-sm mt-1',
	},
	variants: {
		color: {
			default: {
				base: 'bg-gray-100 dark:bg-gray-900 dark:text-white',
			},
		},
		size: {
			md: {},
		},
		variant: {},
	},
	defaultVariants: {
		color: 'default',
		size: 'md',
	},
});

// Define
export type InputVariants = VariantProps<typeof theme>;
interface InputProps {
	id?: string;
	errors?: string;
	disabled?: boolean;
	label?: string;
	noLabel?: boolean;
	placeholder?: string;
	required?: boolean;
	type?: FieldType;
	loading?: boolean;
	icon?: string;
	leading?: boolean;
	trailing?: boolean;
	className?: string;
	ui?: Partial<typeof theme.slots>;
	color?: InputVariants['color'];
	size?: InputVariants['size'];
	variant?: InputVariants['variant'];
}

export default function Input(props: InputProps) {
	// Data
	const id = useMemo(() => props.id ?? crypto.randomUUID(), [props.id]);
	// const [isFocused, setIsFocused] = useState(false);

	const ui = useMemo(
		() =>
			theme({
				color: props.color,
				size: props.size,
				variant: props.variant,
			}),
		[props.color, props.size, props.variant]
	);

	// Render
	const Label =
		props.label && !props.noLabel ? (
			<label htmlFor={id} className={ui.label({ className: props.ui?.label })}>
				{props.label}
			</label>
		) : null;

	const Error = props.errors ? (
		<span className={ui.errors()}>{props.errors}</span>
	) : null;

	const IconElement = props.icon ? <Icon icon={props.icon} /> : null;

	return (
		<div>
			{Label}
			<div
				className={ui.base({ className: [props.className, props.ui?.base] })}
			>
				{props.leading && IconElement}
				<input
					id={id}
					disabled={props.disabled}
					placeholder={props.placeholder}
					required={props.required}
					type={props.type}
					className={ui.input({ className: props.ui?.input })}
					// onFocus={() => setIsFocused(true)}
					// onBlur={() => setIsFocused(false)}
				/>
				{props.trailing && IconElement}
			</div>
			{Error}
		</div>
	);
}
