'use client';

// Imports
import { HeaderToolbarProps } from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';
import dynamic from 'next/dynamic';
import { ReactNode, useMemo } from 'react';

// Define
export interface HeaderToolbarClientProps<T extends object>
	extends HeaderToolbarProps {
	data?: T[];
}

const LazyTemplateToolBar = dynamic(
	() => import('./lazyElement/TemplateToolBar'),
	{
		loading: () => <p>Loading...</p>,
	}
);
const LazyDashboardToolBar = dynamic(
	() => import('./lazyElement/DashboardToolBar'),
	{
		loading: () => <p>Loading...</p>,
	}
);

export default function HeaderToolbarClient<T extends object>(
	props: HeaderToolbarClientProps<T>
) {
	// Data

	// Methods
	const LeftSlot = useMemo(() => {
		const menuMap: Record<string, ReactNode> = {
			// overview: <DynamicIndexList />,
		};

		return (
			<div className="inline-flex grow basis-1/3 items-center justify-start gap-2">
				<h1 className="text-lg font-bold">{props.title}</h1>
				<h2>Ctxt menu: {props.path}</h2>
				{menuMap[props.path]}
			</div>
		);
	}, [props.path, props.title]);

	const CenterSlot = useMemo(() => {
		const menuMap: Record<string, ReactNode> = {
			// overview: <DynamicIndexList />,
		};

		return (
			menuMap[props.path] && (
				<div className="inline-flex grow basis-1/3 items-center justify-center gap-2">
					{menuMap[props.path]}
				</div>
			)
		);
	}, [props.path]);

	const RightSlot = useMemo(() => {
		const menuMap: Record<string, ReactNode> = {
			templates: <LazyTemplateToolBar />,
			dashboard: <LazyDashboardToolBar />,
		};

		return (
			<div className="inline-flex grow basis-1/3 items-center justify-end gap-2">
				{menuMap[props.path]}
			</div>
		);
	}, [props.path]);

	// Render
	return (
		<header className="border-grayscale-200 col-span-full row-span-1 row-start-1 flex items-center justify-between gap-2 border-b pb-2">
			{LeftSlot}
			{CenterSlot}
			{RightSlot}
		</header>
	);
}
