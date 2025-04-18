import CreateTemplateForm from '@/components/form/CreateTemplateForm';
import HeadMenuToolbar from '@/components/layout/submenu/HeadMenuToolbar';

export default function TemplatesPage() {
	// Data

	// Methods

	// Render
	return (
		<section className="box col-span-full row-span-full flex flex-col gap-2">
			<HeadMenuToolbar title="Schema" />
			<CreateTemplateForm />
		</section>
	);
}
