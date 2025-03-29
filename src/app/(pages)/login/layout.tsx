// Imports
// Define

import MainFooter from '@/components/layout/MainFooter';
import MainHeader from '@/components/layout/MainHeader';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Data
	console.log('LOGIIIN');
	// Methods

	// Render
	return (
		<>
			<MainHeader />
			<main className="col-span-full col-start-1 row-span-full row-start-2 flex flex-col">
				{children}
			</main>
			<MainFooter />
		</>
	);
}
