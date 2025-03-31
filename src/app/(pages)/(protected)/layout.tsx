// Imports
// Define

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Nav from '@/components/layout/Nav';
import React from 'react';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Data

	// Methods

	// Render
	return (
		<>
			<Header className="col-span-full col-start-3 row-span-1 row-start-1 bg-amber-700" />
			<Nav gridClassName="col-span-1 row-start-1 row-end-5" />
			<main className="col-span-full col-start-2 row-span-full row-start-2 bg-amber-400">
				{children}
			</main>
			<Footer className="col-span-full col-start-3 row-span-1 row-start-5 bg-amber-200" />
		</>
	);
}
