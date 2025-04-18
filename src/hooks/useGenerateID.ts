// Imports
import { useMemo } from 'react';

// Define
interface GenerateIDProps {
	id?: string;
	label?: string;
}

export function useGenerateID(props: GenerateIDProps) {
	// Data

	// Methods
	return useMemo(
		() => props.id ?? props.label?.replace(/\s+/g, '_').toLowerCase(),
		[props.id, props.label]
	);
}
