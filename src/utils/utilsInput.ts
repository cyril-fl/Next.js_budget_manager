// Imports
// Define
import { emitsClick } from '@utils/emits';

const ALLOWED_KEYS = [
	'Backspace',
	'Delete',
	'ArrowLeft',
	'ArrowRight',
	'ArrowUp',
	'ArrowDown',
	'Tab',
	'Enter',
	'Escape',
	'Shift',
	'Control',
	'Alt',
	'Meta',
];
type AllowedKeys = (typeof ALLOWED_KEYS)[number];
interface UtilsInputProps {
	leading?: boolean;
	trailing?: boolean;
	onLeadingClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onTrailingClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function utilsInput(props: UtilsInputProps = {}) {
	// Data

	// Methods
	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const isNumber = /^\d$/.test(e.key);
		const isAllowedFunctionKey = ALLOWED_KEYS.includes(e.key);

		const isModifierPressed = e.metaKey || e.ctrlKey || e.altKey;

		if (!isNumber && !isAllowedFunctionKey && !isModifierPressed) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		props.leading && emitsClick(e, { onClick: props.onLeadingClick });
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		props.trailing && emitsClick(e, { onClick: props.onTrailingClick });
	};
	// Lifecycle

	return { handleKey, handleIconClick };
}
