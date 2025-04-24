import { utilsIcons } from '@utils/utilsIcons';
import { LinkProps } from 'next/link';

export type NavigationItem = {
	label: string;
	pathname: string | LinkProps['href'];
	children?: NavigationItem[];
	icon?: string;
};

// noinspection JSUnusedGlobalSymbols
export function utilsNavigation() {
	const isProd = process.env.next_env === 'production';
	const icons = utilsIcons();

	const description: NavigationItem[] = [
		{
			label: 'Dashboard',
			pathname: {
				pathname: '/dashboard',
				// TODO modifier ca
				query: { year: '2025' },
			},
			icon: icons.dashboard,
		},
		{
			label: 'Calendar',
			pathname: {
				pathname: '/calendar',
				// TODO modifier ca
				query: { year: '2025' },
			},
			icon: icons.calendar,
		},
		{
			label: 'Overview',
			pathname: {
				pathname: '/overview',
				// TODO modifier ca
				query: { year: '2025', month: '00' },
			},
			icon: icons.eyeOn,
		},
		{
			label: 'Savings accounts',
			pathname: '/savings',
			icon: icons.savings,
		},
		{
			label: 'Template',
			pathname: '/templates',
			icon: icons.template,
		},

		{
			label: 'Settings',
			pathname: 'settings',
			icon: icons.settings,
		},
	];

	if (!isProd) {
		description.unshift({
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
