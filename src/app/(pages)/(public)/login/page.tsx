// Import
import { useConsole } from '@/.debug/hooks/useConsole';
import AuthForm from '@/components/form/AuthForm';
// Define

export default function LoginPage() {
	// Data

	const Console = useConsole();

	// Methods

	// Render
	return (
		<section className="flex grow flex-col items-center justify-center p-4">
			<AuthForm />
		</section>
	);
}
