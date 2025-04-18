// Imports
// Define
interface BudgetPreviewCardProps {
	// TODO remplacer any
	item: any;
}

export default function BudgetPreviewCard(props: BudgetPreviewCardProps) {
	// Data

	// Methods

	// Render
	return (
		<li key={props.item.id} className="box col-span-4">
			<h2 className="text-lg font-bold">{props.item.name}</h2>
			<p>Balance: {props.item.balance}</p>
		</li>
	);
}
