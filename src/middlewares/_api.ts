import { NextRequest, NextResponse } from 'next/server';

export default function handlers(request: NextRequest) {
	const token = request.headers.get('authorization')?.replace(/^Bearer /, '');
	// TODO: use config.token
	if (!token || token !== 'config.token') {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	return NextResponse.next();
}
