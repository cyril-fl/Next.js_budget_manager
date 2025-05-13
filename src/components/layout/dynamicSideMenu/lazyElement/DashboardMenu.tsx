// Imports
import DashboardToolBar from '@/components/layout/dynamicSideMenu/lazyElement/DashboardToolBar';
import IndexList from '@/components/layout/dynamicSideMenu/lazyElement/IndexList';
import IndexListShort from '@/components/layout/dynamicSideMenu/lazyElement/IndexListShort';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

// Define

export default function DashboardMenu() {
	// Data
	const param = useSearchParams();
	const tab = param.get('tab');
	// Methods
	console.log('DashboardMenu', param.get('tab'));
	const LinkList = useMemo(() => {
		const map = {
			year: <IndexListShort />,
			month: <IndexList />,
		};

		return map[tab as keyof typeof map] ?? null;
	}, [tab]);

	// Render
	return (
		<>
			<DashboardToolBar />
			{LinkList}
		</>
	);
}
