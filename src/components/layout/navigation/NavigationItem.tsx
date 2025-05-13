// Imports
import Button, { ButtonProps } from '@/components/ui/Button';
import { TooltipProps } from '@/components/ui/Tooltip';
import { pick } from '@core';

// Define
type TooltipBaseProps = Omit<TooltipProps, 'color' | 'size' | 'ui'>;
type ButtonBaseProps = Omit<ButtonProps, 'label' | 'color' | 'size' | 'ui'>;

export interface NavigationItemProps extends TooltipBaseProps, ButtonBaseProps {
	// label?: string | JSX.Element;
	// color?: ButtonVariants['color'];
	// size?: ButtonVariants['size'];
	// ui?: Partial<typeof theme.slots>;
}
export default function NavigationItem(props: NavigationItemProps) {
	// Data
	const propsTooltip = pick(props, [
		'text',
		'label',
		'position',
		'offset',
		'arrow',
	]);
	const propsButton = pick(props, ['icon', 'to']);
	// Methods

	// Render
	return (
		<li>
			{/*TODO DELETE classname*/}
			{/*<Tooltip {...propsTooltip}>*/}
			<Button
				size="md"
				variant="ghost"
				color="secondary"
				leading
				noLabel
				className="text-stone-950"
				// rounded
				// squared
				{...propsButton}
			/>
			{/*</Tooltip>*/}
		</li>
	);
}
