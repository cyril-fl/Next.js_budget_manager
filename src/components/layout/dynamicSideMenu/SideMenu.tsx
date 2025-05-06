// Import
import SideMenuClient from '@/components/layout/dynamicSideMenu/SideMenuClient';
import { utilsApi } from '@/lib_D/useApi';
import { CtxMenuViewKey } from '@/stores/useCtxMenu';
import { DynamicElementProps } from '@types';

// Define
export type SideMenuProps = DynamicElementProps<CtxMenuViewKey>;

// Component
export default async function SideMenu<T extends object>(props: SideMenuProps) {
	// Data
	const { get } = utilsApi();

	// TODO check ou est le probleme et pk mes data retourne en string et non number?
	const { data } = await get<Array<T>>(props.target, props.option);

	// Methods

	// Render
	return <SideMenuClient data={data} path={props.path} />;
}
