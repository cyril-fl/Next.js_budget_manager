'use client';

// Import
import { Icon } from '@iconify/react';
import { SelectContentProps } from '@radix-ui/react-select';
import { utilsIcons } from '@utils/utilsIcons';
import { Select as RdxSelect } from 'radix-ui';
import { Fragment, ReactNode, useCallback, useMemo, useState } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

// UI
const theme = tv({
	slots: {
		base: 'focus:ring-none inline-flex items-center justify-between focus:outline-none  ',
		triggerIcon: ' ',
		value: '',
		label: 'tracking-wider uppercase',
		content: 'z-50  focus:outline-none ',
		scrollButton: 'flex items-center justify-center',
		scrollIcon: '',
		group: '',
		separator: '',
		item: 'focus:ring-none outline-0 relative flex cursor-pointer items-center',
		indicator: 'data-[state=checked]:block data-[state=unchecked]:hidden',
		indicatorIcon: '',
	},
	variants: {
		variant: {
			nude: '',
			toolbar: '',
		},
		color: {
			neutral: '',
		},
		size: {
			xs: '',
			sm: {
				base: 'gap-2 text-xs',
				content: 'shadow-lg bg-white p-1 rounded-md',
				group: 'space-y-1',
				triggerIcon: 'ml-1 size-2',
				separator: 'my-1 border-t',
				item: 'rounded px-1.5 py-1 text-xs gap-1',
				indicator: 'size-3 ',
				indicatorIcon: 'size-full ',
			},
			md: {
				base: 'gap-2 text-sm',
				content: 'shadow-lg bg-white',
				group: 'space-y-1',
				triggerIcon: 'ml-2 size-4',
				separator: 'my-1 border-t',
				item: 'rounded px-1.5 py-1 text-sm gap-2',
				indicator: 'size-4 ',
				indicatorIcon: 'size-full ',
			},
			lg: '',
		},
		block: {
			true: 'w-full',
		},
		fit: {
			true: 'w-[var(--radix-select-trigger-width)]',
		},
	},
	compoundVariants: [
		{
			variant: 'nude',
			color: 'neutral',
			className: {
				base: 'font-bold',
				value: 'text-grayscale-400',
				content: 'shadow-lg bg-white',
				triggerIcon: 'text-grayscale-700',
				label: 'text-gray-400',
				scrollButton: 'text-gray-400',
				scrollIcon: 'text-grayscale-700',
				separator: '',
				item: `text-gray-700 transition-colors outline-none select-none
				data-[state=checked]:bg-grayscale-900 data-[state=checked]:text-grayscale-50 hover:bg-gray-100 data-[state=checked]:font-medium
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
				indicator: 'text-white',
			},
		},
		{
			variant: 'toolbar',
			color: 'neutral',
			className: {
				base: 'font-bold ring ring-grayscale-300 text-grayscale-700 px-1.5 py-1 rounded',
				value: 'text-red-200',
				content: 'shadow-lg bg-white',
				triggerIcon: 'text-grayscale-700',
				label: 'text-gray-400',
				scrollButton: 'text-gray-400',
				scrollIcon: 'text-grayscale-700',
				separator: '',
				item: `text-gray-700 transition-colors outline-none select-none
				data-[state=checked]:bg-grayscale-900 data-[state=checked]:text-grayscale-50 hover:bg-gray-100 data-[state=checked]:font-medium
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
				indicator: 'text-white',
			},
		},
	],
	defaultVariants: {
		variant: 'nude',
		color: 'neutral',
		size: 'sm',
	},
});
export type SelectVariants = VariantProps<typeof theme>;

// Define
export type SelectionGroup<T> = {
	label?: string;
	options: SelectionOption<T>[];
};
export type SelectionOption<T> = {
	value: T;
	displayValue: string;
};
export interface SelectProps<T>
	extends Pick<
		SelectContentProps,
		'alignOffset' | 'align' | 'sideOffset' | 'side' | 'position'
	> {
	placeholder?: string;
	defaultValue?: string;
	options: SelectionGroup<T> | SelectionGroup<T>[];
	onChange?: (value: string) => void;
	scrollButton?: boolean;
	checkedIndicator?: boolean;
	separator?: boolean;
	block?: boolean;
	fit?: boolean;
	variant?: SelectVariants['variant'];
	color?: SelectVariants['color'];
	className?: string;
	openIcon?: string;
	closeIcon?: string;
	ui?: Partial<typeof theme.slots>;
}
interface SelectItemProps {
	value: string;
	children?: ReactNode;
	className?: string;
	ui?: Partial<typeof theme.slots>;
}

// Component
export function Select<T = string>(props: SelectProps<T>) {
	// Data
	const icons = utilsIcons();
	const [isOpen, setIsOpen] = useState(false);

	const SelectGroup: SelectionGroup<T>[] = Array.isArray(props.options)
		? props.options
		: [props.options];

	const ui = useMemo(
		() =>
			theme({
				variant: props.variant,
				color: props.color,
				block: props.block,
				fit: props.fit,
			}),
		[]
	);

	const OpenIcon = useMemo(() => {
		const openIcon = props.openIcon ?? icons.chevronUp;
		const closeIcon = props.closeIcon ?? icons.chevronDown;
		const name = isOpen ? openIcon : closeIcon;
		return <Icon icon={name} />;
	}, [isOpen, icons, props.openIcon, props.closeIcon]);

	// Methods
	const ScrollButton = useCallback(
		(direction: 'up' | 'down') => {
			const icon = direction === 'up' ? icons.chevronUp : icons.chevronDown;

			const Component =
				direction === 'up'
					? RdxSelect.ScrollUpButton
					: RdxSelect.ScrollDownButton;

			return (
				props.scrollButton && (
					<Component className="flex items-center justify-center p-2 text-gray-400">
						<Icon icon={icon} className="size-4 text-blue-500" />
					</Component>
				)
			);
		},
		[isOpen, icons, props.scrollButton]
	);

	// Render
	const SelectItem = ({ value, children }: SelectItemProps) => (
		<RdxSelect.Item
			value={value}
			className={ui.item({ className: props.ui?.item })}
		>
			<RdxSelect.ItemText>{children}</RdxSelect.ItemText>

			{props.checkedIndicator && (
				<RdxSelect.ItemIndicator
					className={ui.indicator({ className: props.ui?.indicator })}
				>
					<Icon
						icon={icons.check}
						className={ui.indicatorIcon({ className: props.ui?.indicatorIcon })}
					/>
				</RdxSelect.ItemIndicator>
			)}
		</RdxSelect.Item>
	);

	return (
		<RdxSelect.Root
			onValueChange={props.onChange}
			defaultValue={props.defaultValue}
		>
			<RdxSelect.Trigger
				className={ui.base({
					className: [props.ui?.base, props.className],
				})}
			>
				<RdxSelect.Value
					placeholder={props.placeholder}
					className={ui.value({
						className: [props.ui?.value, props.className],
					})}
				/>
				<RdxSelect.Icon
					className={ui.triggerIcon({
						className: [props.ui?.triggerIcon, props.className],
					})}
					asChild
				>
					{OpenIcon}
				</RdxSelect.Icon>
			</RdxSelect.Trigger>

			<RdxSelect.Portal>
				<RdxSelect.Content
					position={props.position}
					side={props.side}
					sideOffset={props.sideOffset}
					align={props.align}
					alignOffset={props.alignOffset}
					className={ui.content({ className: props.ui?.content })}
				>
					{ScrollButton('up')}

					<RdxSelect.Viewport>
						{SelectGroup.map((group, index) => (
							<Fragment key={index}>
								<RdxSelect.Group
									className={ui.group({ className: props.ui?.group })}
								>
									<RdxSelect.Label
										className={ui.label({ className: props.ui?.label })}
									>
										{group.label}
									</RdxSelect.Label>

									{group.options.map((option) => (
										<SelectItem
											key={option.value as string}
											value={option.value as string}
										>
											{option.displayValue}
										</SelectItem>
									))}
								</RdxSelect.Group>
								{index !== SelectGroup.length - 1 && props.separator && (
									<RdxSelect.Separator
										className={ui.separator({ className: props.ui?.separator })}
									/>
								)}
							</Fragment>
						))}
					</RdxSelect.Viewport>

					{ScrollButton('down')}
				</RdxSelect.Content>
			</RdxSelect.Portal>
		</RdxSelect.Root>
	);
}
