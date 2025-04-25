// Import
import clsx from 'clsx';
import { Select as RdxSelect } from 'radix-ui';
import { forwardRef, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

// UI
const theme = tv({
	slots: {},
	variants: {},
	compoundVariants: [],
	defaultVariants: {},
});

// Define
interface SelectProps {
	placeholder?: string;

	variant?: string;
	size?: string;
}
interface SelectItemProps {
	className?: string;
	children: ReactNode;
}
// Component
export function Select(props: SelectProps) {
	// Data
	// Methods
	// Render
	return (
		<RdxSelect.Root>
			<RdxSelect.Trigger>
				<RdxSelect.Value />
				<RdxSelect.Icon />
			</RdxSelect.Trigger>

			<RdxSelect.Portal>
				<RdxSelect.Content>
					<RdxSelect.ScrollUpButton />
					<RdxSelect.Viewport>
						<RdxSelect.Group>
							<RdxSelect.Label>Test</RdxSelect.Label>
							<SelectItem></SelectItem>
						</RdxSelect.Group>

						<RdxSelect.Separator />
					</RdxSelect.Viewport>
					<RdxSelect.ScrollDownButton />
					<RdxSelect.Arrow />
				</RdxSelect.Content>
			</RdxSelect.Portal>
		</RdxSelect.Root>
	);
}

const SelectItem = forwardRef(
	({ children, ...props }: SelectItemProps, forwardedRef) => {
		return (
			<RdxSelect.Item
				className={clsx('SelectItem', props.className)}
				{...props}
				ref={forwardedRef}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className="SelectItemIndicator">
					<CheckIcon />
				</Select.ItemIndicator>
			</RdxSelect.Item>
		);
	}
);
