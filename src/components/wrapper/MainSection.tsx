// Imports
import React from 'react';

// Define
interface MainSectionProps {
	children: React.ReactNode;
}
export default function MainSection({ children }: MainSectionProps) {
	// Data

	// Methods

	// Render
	return (
		<>
			<main className="grid-base grow">
				<section className="box col-span-full row-span-full row-start-1">
					{children}
				</section>
			</main>
		</>
	);
}
