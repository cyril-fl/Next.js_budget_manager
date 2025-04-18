// Imports
// Define
import Button, { ButtonProps } from '@/components/global/Button';
import { NavigationItem } from '@utils/utilsNavigation';

interface NavLinkProps extends NavigationItem {
	size?: ButtonProps['size'];
	className?: string;
}

export default function NavLink(props: NavLinkProps) {
	// Data

	// Methods

	// Render
	return (
		<li className={props.className}>
			<Button
				size={props.size}
				label={props.label}
				to={props.pathname}
				icon={props.icon}
				variant="ghost"
				color="secondary"
				leading
				noLabel
				rounded
				squared
			/>
		</li>
	);
}
