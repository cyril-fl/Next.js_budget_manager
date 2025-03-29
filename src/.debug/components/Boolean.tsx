// Imports
// Define
interface BooleanProps {
	label?: string;
	data?: boolean;
}

export default function Boolean(props: BooleanProps) {
	// Data
	const isProd = process.env.next_env === 'production';

	// Methods

	// Render
	const Label = props.label && (
		<span className="text-gray-500 dark:text-gray-400">{props.label} :</span>
	);
	return !isProd ? (
		<pre className="space-x-2">
			{Label}
			<span className="text-gray-500 dark:text-gray-400">
				{props.data ? 'true' : 'false'}
			</span>
		</pre>
	) : null;
}
