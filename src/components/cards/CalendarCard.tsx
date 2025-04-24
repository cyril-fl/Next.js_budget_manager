// Imports
// Define
import Button from '@/components/global/Button';
import { LocalItem as CalendarItem } from '@utils/frequentRequest/calendar';
import utilsDate from '@utils/utilsDate';

interface FolderPreviewCardProps {
	item: CalendarItem;
}

export default function CalendarCard(props: FolderPreviewCardProps) {
	// Data
	const { formatMonth } = utilsDate();

	// Methods

	// Render
	return (
		<div className="box col-span-4 h-fit">
			<h2 className="text-lg font-bold">{props.item.reportYear}</h2>
			<ul className="grid grid-cols-3 gap-2">
				{props.item.monthsIndex.map((month: number) => (
					<li key={month} className="">
						<Button
							label={formatMonth(props.item.reportYear, month, {
								month: 'short',
							})}
							to={{
								pathname: '/overview',
								query: {
									year: props.item.reportYear,
									month: month,
								},
							}}
							className="justify-start"
							block
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
