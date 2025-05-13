import '@/assets/style/globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import React from 'react';

// const geistSans = Geist({
// 	variable: '--font-geist-sans',
// 	subsets: ['latin'],
// });
//
// const geistMono = Geist_Mono({
// 	variable: '--font-geist-mono',
// 	subsets: ['latin'],
// });

const figtree = Figtree({
	variable: '--font-figtree',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
});

export const metadata: Metadata = {
	title: 'ComptApp',
	description: 'Next hello_word application',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{/*  */}
			<body
				className={`${figtree.variable} size-screen overflow-hidden p-4 antialiased`}
			>
				<div className="flex size-full gap-4">{children}</div>
			</body>
		</html>
	);
}
