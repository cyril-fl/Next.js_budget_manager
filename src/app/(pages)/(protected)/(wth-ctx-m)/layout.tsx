// Imports
// Define
import NavigationBar from '@/components/layout/navigation/NavigationBar';
import MainSection from '@/components/layout/wrapper/MainSection';
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
			<MainSection>{children}</MainSection>
		</>
	);
}
