// Imports
import { useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

// UI
const theme = tv({
	slots: {
		base: 'relative overflow-scroll ',
		label: 'sticky  ',
		content: '',
	},
	variants: {
		color: {
			default: {
				base: 'bg-gray-100  dark:bg-gray-900 text-gray-500 dark:text-white',
				label:
					'bg-gray-950/80  dark:bg-gray-50/80 text-white dark:text-black  w-fit',
				content: 'text-gray-500 dark:text-white',
			},
		},
		size: {
			md: {
				base: 'p-4 rounded-md max-h-[600px]',
				label: 'top-4 left-0 p-2 rounded-md',
			},
		},
	},
	defaultVariants: {
		color: 'default',
		size: 'md',
	},
});

// Define
export type PreVariants = VariantProps<typeof theme>;
interface PreProps {
	children?: React.ReactNode;
	data?: React.ReactNode | object;
	label?: string;
	color?: PreVariants['color'];
	size?: PreVariants['size'];
	class?: string;
	ui?: Partial<typeof theme.slots>;
}

export default function Pre(props: PreProps) {
	// Data
	const isProd = process.env.next_env === 'production';
	const ui = useMemo(
		() =>
			theme({
				size: props.size,
				color: props.color,
			}),
		[props.color, props.size]
	);
	// Methods

	// Render
	const Label = props.label && (
		<h2 className={ui.label({ class: props.ui?.label })}>{props.label}</h2>
	);

	const Preview =
		props.children || props.data
			? (props.children ?? JSON.stringify(props.data, null, 2))
			: null;

	return (
		!isProd && (
			<div className={ui.base({ class: [props.class, props.ui?.base] })}>
				{Label}
				<pre className={ui.content({ class: props.ui?.content })}>
					{Preview}
				</pre>
			</div>
		)
	);
}
