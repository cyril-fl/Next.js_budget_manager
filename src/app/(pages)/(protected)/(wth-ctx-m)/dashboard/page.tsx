import FolderPreviewCard from '@/components/cards/FolderPreviewCard';
import Button from '@/components/global/Button';
import HeadMenuToolbar from '@/components/layout/submenu/HeadMenuToolbar';

export default async function DashboardPage() {
	// Data
	const emptyTable: any[] = [];
	// TODO Ceci c'est ma route index
	const fullTable: any[] = [
		{
			year: 2021,
			months: [
				{
					number: 0,
				},
				{
					number: 1,
				},
				{
					number: 2,
				},
				{
					number: 3,
				},
				{
					number: 4,
				},
				{
					number: 5,
				},
				{
					number: 6,
				},
				{
					number: 7,
				},
				{
					number: 8,
				},
				{
					number: 9,
				},
				{
					number: 10,
				},
				{
					number: 11,
				},
			],
		},
		{
			year: 2022,
			months: [
				{
					number: 0,
				},
				{
					number: 1,
				},
				{
					number: 2,
				},
				{
					number: 3,
				},
				{
					number: 4,
				},
				{
					number: 5,
				},
				{
					number: 6,
				},
				{
					number: 7,
				},
				{
					number: 8,
				},
				{
					number: 9,
				},
				{
					number: 10,
				},
				{
					number: 11,
				},
			],
		},
		{
			year: 2023,
			months: [
				{
					number: 0,
				},
				{
					number: 1,
				},
				{
					number: 2,
				},
				{
					number: 3,
				},
				{
					number: 4,
				},
				{
					number: 5,
				},
				{
					number: 6,
				},
				{
					number: 7,
				},
				{
					number: 8,
				},
				{
					number: 9,
				},
				{
					number: 10,
				},
				{
					number: 11,
				},
			],
		},
		{
			year: 2024,
			months: [
				{
					number: 0,
				},
				{
					number: 1,
				},
				{
					number: 2,
				},
				{
					number: 3,
				},
				{
					number: 4,
				},
				{
					number: 5,
				},
				{
					number: 6,
				},
				{
					number: 7,
				},
				{
					number: 8,
				},
				{
					number: 9,
				},
				{
					number: 10,
				},
				{
					number: 11,
				},
			],
		},
		{
			year: 2025,
			months: [
				{
					number: 0,
				},
				{
					number: 1,
				},
				{
					number: 2,
				},
				{
					number: 3,
				},
				{
					number: 4,
				},
			],
		},
	];

	const testData: any[] = fullTable;
	// Methods

	// Render
	if (testData.length === 0) {
		return (
			<section className="box col-span-full col-start-1 row-span-full row-start-1 flex grow flex-col items-center justify-center p-4">
				<h1>Dashboard</h1>
				<p className="text-sm text-gray-500">No data available.</p>
				<Button to="/templates/add" label="Create a template" color="primary" />
			</section>
		);
	}
	return (
		<>
			<HeadMenuToolbar title="Setting" />
			{testData.map((item) => (
				<FolderPreviewCard item={item} key={item.year} />
			))}
		</>
	);
}
