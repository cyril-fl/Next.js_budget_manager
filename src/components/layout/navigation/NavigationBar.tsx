// Imports
// Define
import NavigationItem from '@/components/layout/navigation/NavigationItem';
import { utilsNavigation } from '@utils/utilsNavigation';
import { Fragment, ReactNode } from 'react';

interface NavigationProps {
	children?: ReactNode;
	hideChildren?: boolean;
}

export default function NavigationBar({ children, ...props }: NavigationProps) {
	// Data
	const { pages } = utilsNavigation();
	const isChildren = children && !props.hideChildren;
	const topNavItems = pages.slice(0, -1);
	const bottomNavItems = pages.slice(-1);

	// Methods

	// Render
	const CtxMenu = isChildren && (
		<menu className="box flex shrink-0 flex-col items-stretch gap-2 truncate overflow-hidden">
			{children}
		</menu>
	);
	const Component = !isChildren ? Fragment : 'div';

	return (
		<Component className="flex shrink-0 items-stretch gap-2 overflow-hidden">
			<nav className="box-base black-box flex flex-col items-center justify-start space-y-2 text-white">
				<ul className="flex grow flex-col gap-2">
					{topNavItems.map((item, index) => (
						<NavigationItem
							key={index}
							text={item.label}
							label={item.label}
							position="right"
							offset={10}
							to={item.pathname}
							icon={item.icon}
							arrow
						/>
					))}
				</ul>
				<ul className="flex grow flex-col justify-end gap-2">
					{bottomNavItems.map((item, index) => (
						<NavigationItem
							key={index}
							text={item.label}
							position="right"
							offset={10}
							to={item.pathname}
							icon={item.icon}
							arrow
						/>
					))}
				</ul>
			</nav>

			{CtxMenu}
		</Component>
	);
}
