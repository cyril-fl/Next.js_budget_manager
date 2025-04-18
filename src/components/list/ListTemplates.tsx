'use client';

// Imports
import Pre from '@/.debug/components/Pre';
import { useViewStyle } from '@/stores/useViewStyle';

// Define
interface ListTemplatesProps {
	// TODO remplacer any
	data: any[];
}

export default function ListTemplates(props: ListTemplatesProps) {
	// Data
	const { viewStyle, setViewStyle } = useViewStyle();

	// Methods

	// Render
	return (
		// TODO changer les flex
		<>
			<Pre data={viewStyle} />
			<ul className={viewStyle.templates === 'grid' ? 'flex' : 'flex-col'}>
				{props.data.map((item) => (
					<li key={item.id} className="inline bg-red-700">
						<h2 className="text-lg font-bold">{item.name}</h2>
					</li>
				))}
			</ul>
		</>
	);
}
