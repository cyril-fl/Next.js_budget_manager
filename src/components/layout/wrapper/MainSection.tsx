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
	return <main className="grid-base grow overflow-hidden">{children}</main>;
}
