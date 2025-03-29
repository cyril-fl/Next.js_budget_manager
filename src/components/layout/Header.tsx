// Imports
// Define
interface HeaderProps {
	className?: string;
	children?: React.ReactNode;
}
export default function Header(props: HeaderProps) {
	// Data
	// Methods

	// Render
	return <header className={`${props.className} `}>{props.children}</header>;
}
