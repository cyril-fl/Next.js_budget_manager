import CtxMenuClient from '@/components/layout/CtxMenuClient';
import MainSection from '@/components/wrapper/MainSection';
import { utilsApi } from '@/lib/useApi';
import { ViewKey as CtxViewKey } from '@/stores/useCtxMenu';
import { ReactNode } from 'react';

interface CtxMenuLayoutProps {
	children: ReactNode;
	path: CtxViewKey;
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
	const response = await get<Array<LocalData>>('transactions', {
		fields: ['reportYear', 'reportMonth'],
		filter: {
			fn: 'GROUP_BY',
			args: [
				{
					l: 'reportYear',
				},
				{
					l: 'reportMonth',
				},
			],
		},
		sort: [{ field: 'reportYear' }, { field: 'reportMonth' }],
	});

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
