import Button from '@/components/global/Button';
import NavLink from '@/components/layout/nav/NavLink';
import SubNavMenu from '@/components/submenu/SubNav';
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
				'flex items-stretch gap-2 overflow-hidden'
			)}
		>
			<ul className="box-base black-box flex flex-col items-center justify-start space-y-2">
				{pages.slice(0, -1).map((item, index) => (
					<NavLink
						key={index}
						size="md"
						label={item.label}
						path={item.path}
						icon={item.icon}
					/>
				))}

				<li className="mt-auto">
					<Button
						size="md"
						label={pages.at(-1)?.label}
						to={pages.at(-1)?.path}
						icon={pages.at(-1)?.icon}
						leading
						noLabel
						rounded
						squared
					/>
				</li>
			</ul>
			<SubNavMenu />
		</nav>
	);
}
