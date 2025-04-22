'use client';
import Pre from '@/.debug/components/Pre';
import { useCtxMenu } from '@/stores/useCtxMenu';

export default function IndexList() {
	const { ctx } = useCtxMenu();

	return (
		<>
			<p>index list</p>
			{/*<Pre label="Store" data={ctx} />*/}
			<Pre label="Store" data={ctx} />
		</>
	);
}
