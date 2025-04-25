'use client';
// Imports
import { SideMenuProps } from '@/components/layout/dynamicSideMenu/SideMenu';
import { useCtxMenu } from '@/stores/useCtxMenu';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo } from 'react';

// Define
interface SideMenuClientProps<T extends object> extends SideMenuProps {
	data?: T[];
}

const DynamicIndexList = dynamic(
	() =>
		import('../../../components/layout/dynamicSideMenu/lazyElement/IndexList'),
	{
		loading: () => <p>Loading...</p>,
		ssr: false,
	}
);

// Component
export default function SideMenuClient<T extends object>(
	props: SideMenuClientProps<T>
) {
	// Data
	const { setCtxMenu } = useCtxMenu();

	useEffect(() => {
		if (props.path === 'overview') {
			setCtxMenu(props.path, props.data ?? []);
		}
	}, [props.data, props.path, setCtxMenu]);

	// Render
	const Menu = useMemo(() => {
		const menuMap: Record<string, ReactNode> = {
			overview: <DynamicIndexList />,
		};

		return menuMap[props.path] ?? null;
	}, [props.path]);

	return <>{Menu}</>;
}
