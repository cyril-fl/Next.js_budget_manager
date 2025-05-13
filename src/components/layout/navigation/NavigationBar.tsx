// Imports
import NavigationList from '@/components/layout/navigation/NavigationList';
import { utilsNavigation } from '@utils/utilsNavigation';
import { clsx } from 'clsx';
import { Fragment, ReactNode } from 'react';

// Define
interface NavigationProps {
	children?: ReactNode;
	noChildren?: boolean;
}

export default async function NavigationBar({
	children,
	...props
}: NavigationProps) {
	// Data
	const { pages, getValidParams } = utilsNavigation();
	// const isChildren = children && !props.noChildren;
	const isChildren = children && !props.noChildren;

	// TODO Refactor ceci pour un meilleur control.
	// const topNavItems = pages.slice(0, -1);
	// const bottomNavItems = pages.slice(-1);

	// Methods

	// Render
	const CtxMenu = isChildren && (
		// <menu className="box flex shrink-0 flex-col items-stretch gap-2 truncate overflow-hidden">
		// <menu className="">
		<menu className="box-r space-y-2 overflow-hidden">{children}</menu>
	);
	const Component = !isChildren ? Fragment : 'nav';
	const Nav = !isChildren ? 'nav' : 'div';

	return (
		<Component className="flex overflow-hidden">
			<Nav
				className={clsx(
					isChildren ? 'box-l' : 'box',
					'flex items-start justify-center'
				)}
			>
				<NavigationList List={pages} />
				{/*<NavigationList List={bottomNavItems} className="justify-end" />*/}
			</Nav>
			{CtxMenu}
		</Component>
	);
}
