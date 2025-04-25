// Imports
// Define
import { ReactNode } from 'react';

interface NavigationProps {
	children?: ReactNode;
	hideChildren?: boolean;
}

export default function NavigationBar({ children, ...props }: NavigationProps) {
	// Data

	// Methods

	// Render
	const CtxMenu = children && !props.hideChildren && <menu>{children}</menu>;

	return (
		<div>
			<nav>
				<ul>
					<li>
						<a href="/overview">Overview</a>
					</li>
					<li>
						<a href="/dashboard">Dashboard</a>
					</li>
					<li>
						<a href="/settings">Settings</a>
					</li>
				</ul>
			</nav>
			{CtxMenu}
		</div>
	);
}
