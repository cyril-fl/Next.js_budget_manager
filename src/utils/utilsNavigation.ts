import { utilsIcons } from '@utils/utilsIcons';
import { LinkProps } from 'next/link';

export type NavigationItem = {
	label: string;
	path: string | LinkProps['href'];
	subPath?: NavigationItem[];
	icon?: string;
	query?: Record<string, string | number>;
	search?: string;
	// query?: Record<string, Ref<string | number> | string | number>;
};

// noinspection JSUnusedGlobalSymbols
export function utilsNavigation() {
	const isProd = process.env.next_env === 'production';
	const icons = utilsIcons();

	const description: NavigationItem[] = [
		// {
		// 	label: 'Dashboard',
		// 	path: {
		// 		pathname: '/dashboard',
		// 		query: { year: '2025' },
		// 	},
		// 	icon: icons.dashboard,
		// },
		{
			label: 'Budget',
			path: {
				pathname: '/budget',
				query: { year: '2025', month: '00' },
			},
			icon: icons.calendar,
		},
		{
			label: 'Settings',
			path: 'settings',
			icon: icons.settings,
		},
	];

	// const findPageByPath = (
	// 	pathArray: string[],
	// 	pagesList: NavigationItem[],
	// 	pagesListIndex = 0
	// ): NavigationItem | undefined => {
	// 	const page = pagesList.find(
	// 		({ path }) => path === pathArray[pagesListIndex]
	// 	);
	//
	// 	return page?.subPath && pathArray.length > pagesListIndex + 1
	// 		? findPageByPath(pathArray, page.subPath, pagesListIndex + 1)
	// 		: page;
	// };

	return {
		pages: description,
		// path: pathArray,
		// current: currentPage,
		// isParent,
	};
}
