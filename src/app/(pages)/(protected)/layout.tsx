// Imports
// Define
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
			<main className="grid-base grow">{children}</main>
		</>
	);
}
