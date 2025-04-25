// Imports
// Define
import NavigationBar from '@/components/layout/navigation/NavigationBar';
import React from 'react';

export default function WithoutCtxMenuLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// Data

	// Methods

	// Render
	return (
		<>
			<NavigationBar />
			{children}
		</>
	);
}
