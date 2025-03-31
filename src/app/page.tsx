// Import

import Pre from '@/.debug/components/Pre';
import { utilsApi } from '@utils//utilsApi';

export default async function Home() {
	const { get } = utilsApi();

	const response = await get('months', {});
	console.log('res', response);

	return <Pre label="data" data={response} />;
}
