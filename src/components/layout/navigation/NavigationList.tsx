'use client';

// Imports
import NavigationItem from '@/components/layout/navigation/NavigationItem';
import {
	NavigationItem as NavigationItemType,
	utilsNavigation,
} from '@utils/utilsNavigation';
import { clsx } from 'clsx';
import { LinkProps } from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

// Define
interface NavigationListProps {
	List: NavigationItemType[];
	className?: string;
}

// Component
export default function NavigationList(props: NavigationListProps) {
	// Data
	const { getValidParams } = utilsNavigation();
	const searchParams = useSearchParams();
	const paramsObject = useMemo(() => {
		const obj: Record<string, string> = {};
		searchParams.forEach((value, key) => {
			obj[key] = value;
		});
		return obj;
	}, [searchParams]);

	// Methods
	function convertPathname(pathname: string | LinkProps['href']) {
		if (typeof pathname === 'string') {
			return pathname;
		}
		return pathname.pathname;
	}
	function convertQuery(pathname: string | LinkProps['href']) {
		if (typeof pathname === 'string') return {};
		if (!pathname.query) return {};

		const query = pathname.query;
		if (typeof query === 'string') return {};
		return query;
	}

	// Render
	return (
		//
		<ul className={clsx('', props.className)}>
			{props.List.map((item, index) => (
				<NavigationItem
					key={index}
					text={item.label}
					position="right"
					offset={10}
					to={{
						pathname: convertPathname(item.pathname),
						query: getValidParams(
							{
								...(convertQuery(item.pathname) as Record<string, string>),
								...paramsObject,
							},
							item.validParams
						),
					}}
					icon={item.icon}
					arrow
				/>
			))}
		</ul>
	);
}
