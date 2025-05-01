// Import
import { Month } from '@types';
import { utilsIcons } from '@utils/utilsIcons';
import { LinkProps } from 'next/link';

// Define
export type NavigationItem = {
	id: string;
	label: string;
	pathname: string | LinkProps['href'];
	validParams?: string[];
	children?: NavigationItem[];
	icon?: string;
};
interface NavigationProps {
	currentYear?: number;
	currentMonth?: Month;
}
// Utils
// noinspection JSUnusedGlobalSymbols
export function utilsNavigation() {
	const isProd = process.env.next_env === 'production';
	const icons = utilsIcons();

	const description: NavigationItem[] = [
		{
			id: 'overview',
			label: 'Overview',
			pathname: '/overview',
			validParams: ['year', 'month'],
			icon: icons.overview,
		},
		{
			id: 'dashboard',
			label: 'Dashboard',
			pathname: '/dashboard',
			validParams: ['tab', 'year', 'month'],
			icon: icons.dashboard,
		},
		/*		{
			id: 'calendar',
			label: 'Calendar',
				pathname: '/calendar',
			icon: icons.calendar,
		},*/

		/*		{
			id: 'savings',
			label: 'Savings accounts',
			pathname: '/savings',
			icon: icons.savings,
		},*/
		/*		{
			id: 'templates',
			label: 'Template',
			pathname: '/templates',
			icon: icons.template,
		},*/
		/*		{
			id: 'settings',
			label: 'Settings',
			pathname: 'settings',
			icon: icons.settings,
		},*/
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

	const getValidParams = (
		params: Record<string, string | string[] | undefined>,
		validParams?: string[]
	) => {
		if (!params) return {};
		if (!validParams?.length) return {};

		const valid = Object.fromEntries(
			validParams
				?.map((key) =>
					typeof params[key] === 'string' && params[key]?.length
						? [key, params[key]]
						: null
				)
				.filter(Boolean) as [string, string][]
		);

		return valid;
	};
	return {
		pages: description,
		findPageByPath,
		getValidParams,
	};
}
