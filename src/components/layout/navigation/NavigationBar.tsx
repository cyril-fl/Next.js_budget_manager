// Imports
import NavigationList from '@/components/layout/navigation/NavigationList';
import { utilsNavigation } from '@utils/utilsNavigation';
import { Fragment, ReactNode } from 'react';

// Define
interface NavigationProps {
	children?: ReactNode;
	hideChildren?: boolean;
}

export default async function NavigationBar({
	children,
	...props
}: NavigationProps) {
	// Data
	const { pages, getValidParams } = utilsNavigation();
	const isChildren = children && !props.hideChildren;

	// TODO Refactor ceci pour un meilleur control.
	// const topNavItems = pages.slice(0, -1);
	// const bottomNavItems = pages.slice(-1);

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
				<NavigationList List={pages} />
				{/*<NavigationList List={bottomNavItems} className="justify-end" />*/}
			</nav>

			{CtxMenu}
		</Component>
	);
}
