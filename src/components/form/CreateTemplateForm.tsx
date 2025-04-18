'use client';
// Imports
// Define

import CreateTemplateStepOne from '@/components/form/createTemplate/CreateTemplateStepOne';
import CreateTemplateStepThree from '@/components/form/createTemplate/CreateTemplateStepThree';
import CreateTemplateStepTwo from '@/components/form/createTemplate/CreateTemplateStepTwo';
import Button from '@/components/global/Button';
import { useState } from 'react';

export default function CreateTemplateForm() {
	// Data
	const [currentStep, setStep] = useState(0);

	const steps = [
		<CreateTemplateStepOne key="step1" title="Entrée" />,
		<CreateTemplateStepOne key="step2" title="Sortie" />,
		<CreateTemplateStepTwo key="step3" />,
		<CreateTemplateStepThree key="step4" />,
	];
	// Methods
	const handleNextStep = () => {
		setStep((prev) => {
			const isLastStep = prev + 1 >= steps.length;
			return isLastStep ? prev : prev + 1;
		});
	};
	const handlePrevStep = () => {
		setStep((prev) => {
			const isFirstStep = prev - 1 < 0;
			return isFirstStep ? prev : prev - 1;
		});
	};

	// Render
	return (
		<form className="flex grow flex-col justify-between">
			<div>{steps[currentStep]}</div>

			<div className="flex gap-2">
				<Button
					label="prev"
					block
					onClick={handlePrevStep}
					disabled={currentStep === 0}
				/>
				<Button
					label="next"
					block
					color="primary"
					onClick={handleNextStep}
					disabled={currentStep === steps.length - 1}
				/>
			</div>
		</form>
	);
}
