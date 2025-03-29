// Imports
import Footer from '@/components/layout/Footer';

// Define

export default function MainFooter() {
	// Data

	// Methods

	// Render
	return (
		<Footer className="col-span-full col-start-1 row-span-1">
			<p className="text-center text-sm text-gray-500">
				&copy; {new Date().getFullYear()} ComptApp. All rights reserved.
			</p>
		</Footer>
	);
}
