import { apiHandler, dashboardHandler, overviewHandler } from '@/middlewares';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
	const defaultHandler = (request: NextRequest) => NextResponse.next();

	const mapping = {
		api: apiHandler,
		dashboard: dashboardHandler,
		overview: overviewHandler,
	};

	const pathname = request.nextUrl.pathname;

	const matchedKey = Object.keys(mapping).find((key) =>
		pathname.startsWith(`/${key}`)
	) as keyof typeof mapping | undefined;

	const handler = matchedKey ? mapping[matchedKey] : defaultHandler;

	return handler(request);
}

export const config = {
	matcher: [
		'/dashboard',
		'/dashboard/:path*',
		'/overview',
		'/overview/:path*',
		'/api',
		'/api/:path*',
	],
};
