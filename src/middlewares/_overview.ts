import { utilsHandler } from '@utils/utilsHandler';
import { NextRequest } from 'next/server';

export default function handlers(request: NextRequest) {
	const { handleParams } = utilsHandler();

	console.log('overviewHandler');
	return handleParams(request, {
		year: new Date().getFullYear().toString(),
		month: new Date().getMonth().toString(),
	});
}
