// Imports
// Define
import Button from '@/components/global/Button';
import { Icon } from '@iconify/react';
import { NavigationItem } from '@utils/utilsNavigation';

interface NavLinkProps extends NavigationItem {}

export default function NavLink(props: NavLinkProps) {
	// Data

	// Methods
	const IconElement = props.icon && (
		// className={ui.icon({ className: props.ui?.icon })}
		<Icon icon={props.icon} />
	);
	// Render
	return (
		<li>
			<Button
				size="xl"
				label={props.label}
				to={props.path}
				icon={props.icon}
				leading
				noLabel
				rounded
			/>
		</li>
	);
}
