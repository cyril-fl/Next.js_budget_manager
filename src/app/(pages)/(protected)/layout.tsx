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
			<Nav gridClassName="" />
			<main className="grow bg-amber-700/10">
				<Header className="" />
				{children}
				<Footer className="" />
			</main>
		</>
	);
}
