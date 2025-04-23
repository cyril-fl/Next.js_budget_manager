import SideMenuClient from '@/components/layout/dynamicSideMenu/SideMenuClient';
import { ApiOptions, ApiPathLabel, utilsApi } from '@/lib/useApi';
import { CtxMenuViewKey } from '@/stores/useCtxMenu';

interface CtxMenuLayoutProps {
	path: CtxMenuViewKey;
	target: ApiPathLabel;
	option?: ApiOptions;
}

export default async function SideMenu<T extends object>(
	props: CtxMenuLayoutProps
) {
	// Data
	const { get } = utilsApi();
	// TODO check ou est le probleme et pk mes data retourne en string et non number?
	const response = await get<Array<T>>(props.target, props.option);
	const data = response.data ?? [];

	// Methods

	// Render
	return <SideMenuClient data={data} path={props.path} />;
}
