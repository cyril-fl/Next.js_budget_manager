// Imports
import Pre from '@/.debug/components/Pre';
import {
	IncomeTransaction,
	OutcomeTransaction,
	TransactionCategory,
} from '@types';

// Define
interface SummaryByCategoryProps {
	data?: TransactionCategory<
		TransactionCategory<IncomeTransaction | OutcomeTransaction>
	>;
}

export default function SummaryByCategory(props: SummaryByCategoryProps) {
	// Data

	// Methods

	// Render
	return (
		props?.data && (
			<ul className="scrollbar-none relative col-span-9 row-span-2 row-start-2 overflow-auto">
				<li className="sticky top-0 z-20 border-b bg-white px-2 py-1 font-bold">
					{props.data.category} <span>{props.data?.total}</span>
				</li>

				{props.data.transactions.map((i, index) => (
					<li key={index}>
						<div className="sticky top-8 z-10 border-b bg-white">
							<span className="block px-2 py-1 font-medium">
								{i.category} {i.total}
							</span>
						</div>
						<ul>
							{i.transactions.map((t, tIndex) => (
								<li key={tIndex}>
									<Pre data={t} />
									<Pre data={t} />
									<Pre data={t} />
									<Pre data={t} />
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		)
	);
}
