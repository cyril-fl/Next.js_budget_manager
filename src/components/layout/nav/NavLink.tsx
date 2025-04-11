// Imports
// Define
import Button, { ButtonProps } from '@/components/global/Button';
import { NavigationItem } from '@utils/utilsNavigation';

interface NavLinkProps extends NavigationItem {
	size?: ButtonProps['size'];
}

export default function NavLink(props: NavLinkProps) {
	// Data

	// Methods
	// Render
	return (
		<li>
			<Button
				size={props.size}
				label={props.label}
				to={props.path}
				icon={props.icon}
				leading
				noLabel
				rounded
				squared
			/>
		</li>
	);
}
