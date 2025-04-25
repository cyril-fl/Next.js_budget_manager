// Imports
import { ReactNode } from 'react';

// Define
interface MainSectionProps {
	children: ReactNode;
}

// Component
export default function MainSection({ children }: MainSectionProps) {
	// Data

	// Methods

	// Render
	return (
		<main className="box flex grow">
			<section className="grid-base w-full overflow-hidden">{children}</section>
		</main>
	);
}
