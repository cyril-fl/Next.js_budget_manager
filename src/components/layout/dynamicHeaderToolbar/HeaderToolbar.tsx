// Imports
import HeaderToolbarClient from '@/components/layout/dynamicHeaderToolbar/HeaderToolbarClient';
import { utilsApi } from '@/lib_D/useApi';
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
	const { data } = await get<Array<T>>(props.target, props.option);

	// Methods

	// Render
	return (
		<HeaderToolbarClient
			path={props.path}
			title={props.title}
			noTitle={props.noTitle}
			data={data}
		/>
	);
}
