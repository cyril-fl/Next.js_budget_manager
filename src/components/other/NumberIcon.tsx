// Imports
import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

// UI
const theme = tv({
	variants: {
		color: {
			none: '',
			light: 'text-gray-500',
			thin: 'text-gray-400',
			bold: 'text-gray-700',
			fill: 'text-gray-900',
			duotone: 'text-gray-600',
		},
		size: {
			none: '',
			sm: 'text-xs',
			md: 'text-sm',
			lg: 'text-base',
			xl: 'text-lg',
			'2xl': 'text-xl',
			'3xl': 'text-2xl',
			'4xl': 'text-3xl',
		},
	},
	defaultVariants: {
		color: 'none',
		size: 'lg',
	},
});

// Define
export type NumberIconVariants = VariantProps<typeof theme>;

interface NumberIconProps {
	value: number;
	style?: 'light' | 'thin' | 'bold' | 'fill' | 'duotone';
	squared?: boolean;
	circle?: boolean;
	size?: NumberIconVariants['size'];
	color?: NumberIconVariants['color'];
	className?: string;
}

const cifferInLetter = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
];

export default function NumberIcon(props: NumberIconProps) {
	// Data
	const iconName = useMemo(() => {
		const parts = ['ph:number'];

		if (props.squared) parts.push('-square');
		if (props.circle) parts.push('-circle');
		if (props.value !== undefined)
			parts.push(`-${cifferInLetter[props.value]}`);
		if (props.style) parts.push(`-${props.style}`);

		return parts.join('');
	}, [props.value, props.style, props.squared, props.circle]);
	// Methods

	const ui = useMemo(
		() =>
			theme({
				className: props.className,
				color: props.color,
				size: props.size,
			}),
		[props.className, props.color, props.size]
	);

	// Render
	return (
		<>
			<Icon icon={iconName} className={ui} />
		</>
	);
}
