'use client';

// Imports
import { Tooltip as RdxTooltip } from 'radix-ui';
import { ReactNode, useMemo, useState } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

// UI
const theme = tv({
	slots: {
		base: 'whitespace-nowrap z-30 TooltipContent',
		trigger: 'text-grayscale-300/30 text-sm italic',
		text: 'truncate',
		arrow: '',
		offset: '',
	},
	variants: {
		color: {
			neutral: {
				base: 'bg-grayscale-950 text-grayscale-50',
				arrow: 'fill-grayscale-950',
			},
		},
		size: {
			xs: {
				base: 'px-1 py-0.5 text-xs',
				arrow: 'h-0.5 w-1',
				offset: '2',
			},
			sm: {
				base: 'px-1.5 py-1 text-xs rounded shadow-sm',
				arrow: 'h-1 w-2',
				offset: '3',
			},
			md: {
				base: 'px-2.5 py-1.5 text-sm',
				arrow: 'h-2 w-4',
				offset: '4',
			},
			lg: {
				base: 'px-3 py-2 text-sm',
				arrow: 'h-2.5 w-5',
				offset: '5',
			},
			xl: {
				base: 'px-3 py-2 text-base',
				arrow: 'h-3 w-6',
				offset: '6',
			},
		},
	},
	defaultVariants: {
		color: 'neutral',
		size: 'sm',
	},
});

/* Types */
type TooltipVariants = VariantProps<typeof theme>;
// Define
interface TooltipProps {
	children?: ReactNode;
	/** The element to hover. */
	label?: string;
	/** The content when label is hover. */
	text?: string;

	color?: TooltipVariants['color'];
	size?: TooltipVariants['size'];
	position?: 'top' | 'bottom' | 'left' | 'right';

	/** Prevent the notification to show when hover */
	prevent?: boolean;
	/** Show the arrow on the notification */
	arrow?: boolean;
	/** Offset between the trigger and the tooltip */
	offset?: number;
	/**
	 * Timing configuration for the notification display.
	 *
	 * @property {number} delay - Time (in ms) before showing the notification after an interaction.
	 * @property {number} debounce - Time (in ms) to prevent multiple consecutive triggers.
	 */
	duration?: { delay: number; debounce: number };
	defaultOpen?: boolean;
	// kbds?: KbdProps['value'][] | KbdProps[]

	class?: string;
	ui?: Partial<typeof theme.slots>;
}

export default function Tooltip(props: TooltipProps) {
	// Data
	const [isOpen, setIsOpen] = useState(!!props.defaultOpen);

	// Methods
	const uiTooltip = useMemo(
		() =>
			theme({
				color: props.color,
				size: props.size,
			}),
		[props.color, props.size, props.ui]
	);

	// TODO optimiser
	// Render
	return (
		<RdxTooltip.Provider
			delayDuration={props.duration?.delay ?? 0}
			skipDelayDuration={props.duration?.debounce ?? 0}
			disableHoverableContent={props.prevent}
		>
			<RdxTooltip.Root
				defaultOpen={props.defaultOpen}
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<RdxTooltip.Trigger asChild>
					{props.children ?? (
						<div>
							<p className={uiTooltip.trigger({ class: props.ui?.trigger })}>
								{props.label}
							</p>
						</div>
					)}
				</RdxTooltip.Trigger>
				<RdxTooltip.Portal>
					<RdxTooltip.Content
						className={uiTooltip.base({ class: [props.class, props.ui?.base] })}
						side={props.position}
						sideOffset={
							props.offset ??
							Number(uiTooltip.offset({ class: props.ui?.offset }))
						}
					>
						{props?.text}
						{props.arrow && (
							<RdxTooltip.Arrow
								className={uiTooltip.arrow({ class: props.ui?.arrow })}
							/>
						)}
					</RdxTooltip.Content>
				</RdxTooltip.Portal>
			</RdxTooltip.Root>
		</RdxTooltip.Provider>
	);
}
