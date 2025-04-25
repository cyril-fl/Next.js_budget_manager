'use client';
// Imports
import { pick } from '@core';
import { Icon } from '@iconify/react';
import { CollapsibleProps } from '@radix-ui/react-collapsible';
import { utilsIcons } from '@utils/utilsIcons';
import { Collapsible } from 'radix-ui';
import { useMemo, useState } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { ButtonProps } from './Button';

// UI
export const theme = tv({
	slots: {
		base: 'relative sticky top-0 z-10 flex items-center justify-between',
		label: 'text-sm font-bold text-grayscale-700',
		content: '',
	},
	variants: {
		color: {
			neutral: {
				base: '', // bg-grayscale-50
			},
			primary: '',
			secondary: '',
			error: '',
			info: '',
			success: '',
			warning: '',
		},
		size: {
			xs: {},
			sm: {},
			md: {},
			lg: {},
			xl: {},
		},
	},
	compoundVariants: [],
	defaultVariants: {
		color: 'neutral',
		size: 'md',
	},
});
export type DisclosureVariants = VariantProps<typeof theme>;

// Define
interface DisclosureProps
	extends Omit<CollapsibleProps, 'color'>,
		Omit<ButtonProps, 'leading' | 'disabled' | 'onClick' | 'size'> {
	asContentChild?: boolean;
	iconOpen?: string;
	iconClose?: string;
	color?: DisclosureVariants['color'];
	size?: DisclosureVariants['size'];
	className?: string;
	ui?: Partial<typeof theme.slots>;
}

export default function Disclosure(props: DisclosureProps) {
	// Data
	const icons = utilsIcons();
	// TODO Mettre un store pour les is oper et gerer ce store dans le paret
	const [open, setOpen] = useState(props.defaultOpen ?? !!props.open);
	const propCollapsible = pick(props, ['defaultOpen', 'disabled']);
	const propButton = pick(props, ['size', 'disabled', 'squared', 'variant']);

	const ui = useMemo(() => {
		return theme({
			color: props.color,
			size: props.size,
		});
	}, [props.color, props.size]);

	// Methods
	function handleOpenChange() {
		const newState = !open;
		setOpen(newState);
		if (props.onOpenChange) props.onOpenChange(newState);
	}

	// Render
	const Label =
		props.label && !props.noLabel ? (
			typeof props.label === 'string' ? (
				<span className={ui.label({ className: [props.ui?.label] })}>
					{props.label}
				</span>
			) : (
				props.label
			)
		) : null;

	const IconName = useMemo(() => {
		const iconOpen = props.iconOpen ?? icons.chevronUp;
		const iconClose = props.iconClose ?? icons.chevronDown;

		return open ? iconOpen : iconClose;
	}, [
		props.iconOpen,
		props.iconClose,
		open,
		icons.chevronDown,
		icons.chevronUp,
	]);

	return (
		<Collapsible.Root {...propCollapsible} onOpenChange={handleOpenChange}>
			<div
				className={ui.base({ className: [props.ui?.base, props.className] })}
			>
				{Label}

				<Collapsible.Trigger asChild>
					<Icon icon={IconName} className="cursor-pointer" />
				</Collapsible.Trigger>
			</div>

			<Collapsible.Content
				className={ui.content({ className: [props.ui?.content] })}
				asChild={props.asContentChild}
			>
				{props.children}
			</Collapsible.Content>
		</Collapsible.Root>
	);
}
