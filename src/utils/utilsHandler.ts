// Imports
import { NextRequest, NextResponse } from 'next/server';

// Define

// Utils
export function utilsHandler() {
	// Data

	// Methods
	function handleParams(request: NextRequest, defaults: object) {
		const url = request.nextUrl.clone();
		let shouldRedirect = false;

		for (const [key, value] of Object.entries(defaults)) {
			if (!url.searchParams.has(key)) {
				url.searchParams.set(key, value);
				shouldRedirect = true;
			}
		}

		if (shouldRedirect) {
			return NextResponse.redirect(url);
		}

		return NextResponse.next();
	}

	return { handleParams };
}
