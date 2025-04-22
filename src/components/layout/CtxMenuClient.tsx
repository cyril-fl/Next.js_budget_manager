'use client';
// Imports
import { ViewKey as CtxViewKey, useCtxMenu } from '@/stores/useCtxMenu';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo } from 'react';

// Define

interface CtxMenuClientProps<T extends object> {
	data?: T[];
	path: CtxViewKey;
}

const DynamicIndexList = dynamic(
	() => import('../../components/layout/lazyElement/IndexList'),
	{
		loading: () => <p>Loading...</p>,
		ssr: false,
	}
);

export default function CtxMenuClient<T extends object>(
	props: CtxMenuClientProps<T>
) {
	// Data
	const { ctx, setCtxMenu } = useCtxMenu();

	useEffect(() => {
		if (props.path === 'overview' && ctx.overview !== props.data) {
			setCtxMenu(props.path, props.data || []);
		}
	}, [props.data, props.path, ctx, setCtxMenu]);

	// Render
	const Menu = useMemo(() => {
		const menuMap: Record<string, ReactNode> = {
			// budget: <SelectYearNavMenu />,
			overview: <DynamicIndexList />,
		};

		return menuMap[props.path] ?? null;
	}, [props.path]);

	return (
		<div className="box flex shrink-0 flex-col items-stretch gap-2 truncate overflow-hidden">
			<h1>Ctxt menu: {props.path}</h1>
			{Menu}
		</div>
	);
}
