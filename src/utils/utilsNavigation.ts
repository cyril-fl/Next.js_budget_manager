// Import
import { utilsIcons } from '@utils/utilsIcons';
import { LinkProps } from 'next/link';

// Define
export type NavigationItem = {
	id: string;
	label: string;
	pathname: string | LinkProps['href'];
	children?: NavigationItem[];
	icon?: string;
};
// Ut
// noinspection JSUnusedGlobalSymbols
export function utilsNavigation() {
	const isProd = process.env.next_env === 'production';
	const icons = utilsIcons();

	const description: NavigationItem[] = [
		{
			id: 'dashboard',
			label: 'Dashboard',
			pathname: {
				pathname: '/dashboard',
				// TODO modifier ca
				query: { year: '2025' },
			},
			icon: icons.dashboard,
		},
		{
			id: 'calendar',
			label: 'Calendar',
			pathname: {
				pathname: '/calendar',
				// TODO modifier ca
				query: { year: '2025' },
			},
			icon: icons.calendar,
		},
		{
			id: 'overview',
			label: 'Overview',
			pathname: {
				pathname: '/overview',
				// TODO modifier ca
				query: { year: '2025', month: '00' },
			},
			icon: icons.overview,
		},
		{
			id: 'savings',
			label: 'Savings accounts',
			pathname: '/savings',
			icon: icons.savings,
		},
		{
			id: 'templates',
			label: 'Template',
			pathname: '/templates',
			icon: icons.template,
		},
		{
			id: 'settings',
			label: 'Settings',
			pathname: 'settings',
			icon: icons.settings,
		},
	];

	if (!isProd) {
		description.unshift({
			id: 'test',
			label: 'Test',
			pathname: '/test',
			icon: icons.test,
		});
	}

	const findPageByPath = (
		target: string | string[],
		items: NavigationItem[],
		depth = 0
	): NavigationItem | undefined => {
		const segments = Array.isArray(target) ? target : [target];
		const currentSegment = segments[depth];
		const currentItem = items.find(
			({ pathname }) => pathname === currentSegment
		);

		const hasMoreSegments = segments.length > depth + 1;

		return currentItem?.children && hasMoreSegments
			? findPageByPath(segments, currentItem.children, depth + 1)
			: currentItem;
	};

	return {
		pages: description,
		findPageByPath,
	};
}
