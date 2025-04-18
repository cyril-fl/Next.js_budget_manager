// Imports
// Define
interface FolderPreviewCardProps {
	item: any;
}

export default function FolderPreviewCard(props: FolderPreviewCardProps) {
	// Data

	// Methods

	// Render
	return (
		<div className="box col-span-4">
			<h2 className="text-lg font-bold">{props.item.year}</h2>
			<ul className="flex flex-wrap gap-2">
				{props.item.months.map((month: any) => (
					<li key={month.number}>Month {month.number + 1}</li>
				))}
			</ul>
		</div>
	);
}
