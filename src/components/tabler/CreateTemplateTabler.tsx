// Imports
import Button from '@/components/global/Button';
import Input from '@/components/global/Input';
import { utilsIcons } from '@utils/utilsIcons';
import { useState } from 'react';

// Define
interface CreateTemplateTablerProps {
	title?: string;
}

export default function CreateTemplateTabler() {
	// Data
	const icons = utilsIcons();
	const [count, setCount] = useState(1);

	// Methods

	// Render
	return (
		<table className="border-spacing w-full table-fixed rounded-xl bg-white">
			<thead>
				<tr className="border-b border-gray-900 [&>th:not(:first-child)]:pr-2 [&>th:not(:last-child)]:pl-2">
					<th className="py-2 text-left text-sm">Nom</th>
					<th className="py-2 text-left text-sm">Montant</th>
					<th className="py-2 text-left text-sm">Catégorie</th>
				</tr>
			</thead>
			<tbody className="[&>tr:first-child>td]:pt-2 [&>tr:last-child>td]:pb-2">
				{[...Array(count)].map((_, i) => (
					<tr key={i} className="[&>*:not(:first-child)]:pl-1">
						<td>
							<Input size="sm" placeholder="Salaire" className="w-full" />
						</td>
						<td>
							<Input size="sm" placeholder="€0.00" className="w-full" />
						</td>
						<td>
							<Input size="sm" placeholder="Travail, Aide" className="w-full" />
						</td>
					</tr>
				))}
			</tbody>

			<tfoot>
				<tr className="col-span-3 border-t border-gray-900 pt-2">
					<td colSpan={3} className="mt-2">
						<div className="flex justify-end">
							<Button
								label="Ajouter une ligne"
								icon={icons.plus}
								size="sm"
								leading
								block
								color="primary"
								onClick={() => setCount((prev) => prev + 1)}
							/>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	);
}
