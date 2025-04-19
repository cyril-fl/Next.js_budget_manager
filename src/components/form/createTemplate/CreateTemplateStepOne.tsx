// Imports
import Button from '@/components/global/Button';
import NumberIcon from '@/components/other/NumberIcon';
import CreateTemplateTabler from '@/components/tabler/CreateTemplateTabler';
import { utilsIcons } from '@utils/utilsIcons';
import { useState } from 'react';

// Define
interface CreateTemplateTablerProps {
	title?: string;
	noTitle?: boolean;
	category?: string[];
}

export default function CreateTemplateStepOne(
	props: CreateTemplateTablerProps
) {
	// Data
	const icons = utilsIcons();
	const [count, setCount] = useState(1);

	// Methods

	// Render
	const Title = props.title && !props.noTitle && (
		<h2 className="text-md font-bold">{props.title}</h2>
	);
	return (
		<div className="space-y-2">
			{Title}
			<div>
				{/*TODO proposer une liste de catégories par defaut, via les props*/}
				<h3 className="text-lf font-boldb flex items-center gap-2">
					<NumberIcon value={1} size="2xl" style="bold" circle />
					<span>Catégories</span>
				</h3>
				<ul className="flex flex-wrap gap-2">
					{props?.category?.length &&
						props.category.map((tag, i) => (
							<li
								key={i}
								className="bg-primary-100 text-primary-700 rounded-full px-3 py-1 text-sm"
							>
								{tag}
							</li>
						))}
					<li>
						<Button
							label="Add"
							icon={icons.plus}
							noLabel
							leading
							squared
							color="primary"
							size="xs"
						/>
					</li>
				</ul>
			</div>

			<div>
				<h3 className="text-lf font-boldb flex items-center gap-2">
					<NumberIcon value={2} size="2xl" style="bold" circle />
					<span>Flux</span>
				</h3>

				<CreateTemplateTabler />
			</div>
		</div>
	);
}
