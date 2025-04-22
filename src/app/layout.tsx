import '@/assets/style/globals.css';
import Nav from '@/components/layout/Nav';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} size-screen gap-2 overflow-y-hidden antialiased`}
			>
				<Nav gridClassName="" />
				{children}
			</body>
		</html>
	);
}
