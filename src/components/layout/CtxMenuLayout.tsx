import CtxMenuClient from '@/components/layout/CtxMenuClient';
import MainSection from '@/components/wrapper/MainSection';
import { ApiOptions, utilsApi } from '@/lib/useApi';
import { CtxMenuViewKey } from '@/stores/useCtxMenu';
import { ReactNode } from 'react';

interface CtxMenuLayoutProps {
	children: ReactNode;
	path: CtxMenuViewKey;
	option?: ApiOptions;
}

// Define
interface LocalData {
	reportYear: string;
	reportMonth: string;
}

export default async function CtxMenuLayout({
	children,
	...props
}: CtxMenuLayoutProps) {
	// Data
	const { get } = utilsApi();

	// TODO check ou est le probleme et pk mes data retourne en string ?
	const response = await get<Array<LocalData>>('calendar', props.option);

	const data = response.data;

	// Methods

	// Render
	return (
		<>
			<CtxMenuClient data={data} path={props.path} />
			<MainSection>{children}</MainSection>
		</>
	);
}
