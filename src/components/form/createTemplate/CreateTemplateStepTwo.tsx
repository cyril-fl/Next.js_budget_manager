// Imports
import Switch from '@/components/global/Switch';
import { useState } from 'react';
// Define

export default function CreateTemplateStepTwo() {
	// Data
	const [isChecked, setIsChecked] = useState(false);

	// Methods
	function handleCheckedChange(value: boolean) {
		console.log('value', value);
		setIsChecked(value);
	}

	// Render
	return (
		<>
			<Switch
				label="Voulez voulez vous mensualisé certaine dépense ? (Ex: …)"
				color="primary"
				size="sm"
			/>
			<Switch
				label="Voulez vous définir des dépense fréquente ? (Ex: Produits d’hygiène,
					extras, sorties,…)"
				color="primary"
				size="sm"
			/>
			<Switch
				label="Voulez vous lier une epargne à ce modèle ?"
				defaultValue={isChecked}
				onValueChange={handleCheckedChange}
				color="primary"
				size="sm"
				hasIcon
			/>
			<Switch
				label={`votre budget commencera à partir  ${Date.now().toString()}. Voulez vous sélectionner un autres moment ?`}
				defaultValue={isChecked}
				onValueChange={handleCheckedChange}
				color="primary"
				size="sm"
				hasIcon
			/>
			{/*<div>*/}
			{/*	/!*TODO Double select avec les mois et les années ? Date foedl de radix vue	*!/*/}
			{/*TODO ne gerer ce cas qu''au moment de creer la premiere fiche*/}
			{/*	<h2>Mois</h2>*/}
			{/*	<InputDate granularity="mm-yyyy" placeholder />*/}
			{/*</div>*/}
		</>
	);
}
