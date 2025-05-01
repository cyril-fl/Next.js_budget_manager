'use client';
// Imports
import { SideMenuProps } from '@/components/layout/dynamicSideMenu/SideMenu';
import { CtxMenuViewKey, useCtxMenu } from '@/stores/useCtxMenu';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo } from 'react';

// Define
interface SideMenuClientProps<T extends object> extends SideMenuProps {
	data?: T[];
}

const DynamicIndexList = dynamic(
	() =>
		import('../../../components/layout/dynamicSideMenu/lazyElement/IndexList')
);

// Component
export default function SideMenuClient<T extends object>(
	props: SideMenuClientProps<T>
) {
	// Data
	const { ctx, setCtxMenu } = useCtxMenu();

	useEffect(() => {
		if (ctx.index === props.data) return;

		setCtxMenu('index', props.data ?? []);
	}, [ctx.index, props.data, setCtxMenu]);

	// Render
	const Menu = useMemo(() => {
		const menuMap: Record<CtxMenuViewKey, ReactNode> = {
			overview: <DynamicIndexList />,
			dashboard: <DynamicIndexList />,
		};

		return menuMap[props.path] ?? null;
	}, [props.path]);

	return <>{Menu}</>;
}
