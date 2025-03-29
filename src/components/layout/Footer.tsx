// Imports
import React from 'react';

// Define
interface FooterProps {
	className?: string;
	children?: React.ReactNode;
}
export default function Footer(props: FooterProps) {
	// Data

	// Methods

	// Render

	return <footer className={`${props.className}`}>{props.children}</footer>;
}
