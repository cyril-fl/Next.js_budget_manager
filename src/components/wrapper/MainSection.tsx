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
			<main className="box flex grow">
				<section className="grid-base w-full overflow-hidden bg-red-700/10">
					{children}
				</section>
			</main>
		</>
	);
}
