'use client';
// Imports
import { SideMenuProps } from '@/components/layout/dynamicSideMenu/SideMenu';
import { CtxMenuViewKey, useCtxMenu } from '@/stores/useCtxMenu';
import { utilsUtils } from '@utils/utilsUtils';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo } from 'react';

// Define
interface SideMenuClientProps<T extends object> extends SideMenuProps {
	data?: T[];
}

const LazyIndexList = dynamic(
	() =>
		import('../../../components/layout/dynamicSideMenu/lazyElement/IndexList')
);

const LazyDashboardMenu = dynamic(() => import('./lazyElement/DashboardMenu'));

const LazyDashboardToolBar = dynamic(
	() => import('./lazyElement/DashboardToolBar')
);

// Component
export default function SideMenuClient<T extends object>(
	props: SideMenuClientProps<T>
) {
	// Data
	const { transformToPhraseCase } = utilsUtils();
	const { ctx, setCtxMenu } = useCtxMenu();

	useEffect(() => {
		if (ctx.index === props.data) return;

		setCtxMenu('index', props.data ?? []);
	}, [props.data, setCtxMenu, ctx.index]);

	// Render
	const Menu = useMemo(() => {
		const menuMap: Record<CtxMenuViewKey, ReactNode> = {
			overview: <LazyIndexList />,
			dashboard: <LazyDashboardMenu />,
		};

		return menuMap[props.path] ?? null;
	}, [props.path]);

	return (
		<>
			<h2 className="head-title-2">{transformToPhraseCase(props.path)}</h2>
			{Menu}
		</>
	);
}
