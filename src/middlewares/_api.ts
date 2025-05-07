import { NextRequest, NextResponse } from 'next/server';

export default function handlers(request: NextRequest) {
	const token = request.headers.get('authorization')?.replace(/^Bearer /, '');
	// TODO: mettre le config toden dans un env file .
	const envAllowedToken = 'cyril-f-test';

	if (!token || token !== envAllowedToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	return NextResponse.next();
}
