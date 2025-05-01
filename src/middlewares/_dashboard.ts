import { utilsHandler } from '@utils/utilsHandler';
import { NextRequest } from 'next/server';

export default function handlers(request: NextRequest) {
	const { handleParams } = utilsHandler();

	const search = request.nextUrl.searchParams;
	const tab = search.get('tab');

	const defaults: Record<string, string> = {
		tab: 'year',
		year: new Date().getFullYear().toString(),
	};

	if (tab === 'month') {
		defaults.month = '0';
	}

	return handleParams(request, defaults);
}
