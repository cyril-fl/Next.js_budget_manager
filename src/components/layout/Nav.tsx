import NavLink from '@/components/layout/nav/NavLink';
import { utilsNavigation } from '@utils/utilsNavigation';
import clsx from 'clsx';

interface NavProps {
	gridClassName?: string;
}

export default function NavComponent(props: NavProps) {
	// Data
	const { pages } = utilsNavigation();

	// Methods'

	// Render
	return (
		<nav className={clsx(props.gridClassName, 'bg-amber-500 p-4')}>
			<ul className="space-y-2">
				{pages.map((item, index) => (
					<NavLink
						key={index}
						label={item.label}
						path={item.path}
						icon={item.icon}
					/>
				))}
			</ul>
		</nav>
	);
}
