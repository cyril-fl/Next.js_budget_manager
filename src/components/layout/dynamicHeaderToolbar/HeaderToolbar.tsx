// Imports
import HeaderToolbarClient from '@/components/layout/dynamicHeaderToolbar/HeaderToolbarClient';
import { utilsApi } from '@/lib/useApi';
import { DynamicElementProps } from '@types';

// Define
export interface HeaderToolbarProps extends DynamicElementProps {
	title?: string;
	noTitle?: boolean;
}

// Component
export default async function HeaderToolbar<T extends object>(
	props: HeaderToolbarProps
) {
	// Data
	const { get } = utilsApi();
	// TODO check ou est le probleme et pk mes data retourne en string et non number?
	const { data } = props.target
		? await get<Array<T>>(props.target, props.option)
		: { data: undefined };

	// Methods

	// Render
	// TODO utilise les component de raidx
	return (
		<HeaderToolbarClient
			path={props.path}
			title={props.title}
			noTitle={props.noTitle}
			data={data}
		/>
	);
}
