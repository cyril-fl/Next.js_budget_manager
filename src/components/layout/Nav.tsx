import NavLink from '@/components/layout/nav/NavLink';
import { utilsNavigation } from '@utils/utilsNavigation';
import clsx from 'clsx';

interface NavProps {
	gridClassName?: string;
}

export default async function NavComponent(props: NavProps) {
	// Data
	const { pages } = utilsNavigation();

	// Methods'

	// Render
	return (
		<nav
			className={clsx(
				props.gridClassName,
				'flex shrink-0 items-stretch gap-2 overflow-hidden'
			)}
		>
			<ul className="box-base black-box flex flex-col items-center justify-start space-y-2">
				{pages.map((item, index) => (
					// TODO: Metre un tooltip au hover
					<NavLink
						key={index}
						size="md"
						label={item.label}
						pathname={item.pathname}
						icon={item.icon}
						className={item.pathname === 'settings' ? 'mt-auto' : ''}
					/>
				))}
			</ul>
			{/*<SubNavMenu />*/}
		</nav>
	);
}
