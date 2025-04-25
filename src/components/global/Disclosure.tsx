'use client';
// Imports
import Button, { ButtonProps } from '@/components/global/Button';
import { utilsIcons } from '@utils/utilsIcons';
import { Collapsible } from 'radix-ui';
import { ReactNode, useMemo, useState } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

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
interface DisclosureProps {
	children?: ReactNode;
	label?: string | ReactNode;
	noLabel?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	disabled?: boolean;
	asChild?: boolean;
	asCollapseChild?: boolean;
	iconOpen?: string;
	iconClose?: string;
	triggerProps?: Omit<
		ButtonProps,
		'icon' | 'onClick' | 'disabled' | 'leading' | 'size'
	>;
	className?: string;
	ui?: Partial<typeof theme.slots>;
	color?: DisclosureVariants['color'];
	size?: DisclosureVariants['size'];
}

export default function Disclosure(props: DisclosureProps) {
	// Data
	const icons = utilsIcons();
	// TODO Mettre un store pour les is oper et gerer ce store dans le paret
	const [open, setOpen] = useState(props.defaultOpen ?? !!props.open);

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
		<Collapsible.Root
			defaultOpen={false}
			open={open}
			onOpenChange={handleOpenChange}
			disabled={props.disabled}
		>
			<div
				className={ui.base({ className: [props.ui?.base, props.className] })}
			>
				{Label}

				<Collapsible.Trigger asChild>
					<Button
						icon={IconName}
						onClick={handleOpenChange}
						disabled={props.disabled}
						size={props.size}
						leading
						{...props.triggerProps}
					/>
				</Collapsible.Trigger>
			</div>

			<Collapsible.Content
				className={ui.content({ className: [props.ui?.content] })}
				asChild={props.asCollapseChild}
			>
				{props.children}
			</Collapsible.Content>
		</Collapsible.Root>
	);
}
