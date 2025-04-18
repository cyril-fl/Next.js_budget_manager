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
			<main className="grid-base grow">
				{/*TODO Supprimer le header de la et ne le mettre que dans les page concerner pour gerer au mieux le menu contextuerl */}
				{/*<Header className="" />*/}
				{children}
				{/*<Footer className="" />*/}
			</main>
		</>
	);
}
