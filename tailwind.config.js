/** @types {import('tailwindcss').Config} */
 
module.exports = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
				primary: {
					50: 'var(--color-primary-50)',
					100: 'var(--color-primary-100)',
					200: 'var(--color-primary-200)',
					300: 'var(--color-primary-300)',
					400: 'var(--color-primary-400)',
					500: 'var(--color-primary-500)',
					600: 'var(--color-primary-600)',
					700: 'var(--color-primary-700)',
					800: 'var(--color-primary-800)',
					900: 'var(--color-primary-900)',
					950: 'var(--color-primary-950)',
				},
				grayscale: {
					50: 'var(--color-grayscale-50)',
					100: 'var(--color-grayscale-100)',
					200: 'var(--color-grayscale-200)',
					300: 'var(--color-grayscale-300)',
					400: 'var(--color-grayscale-400)',
					500: 'var(--color-grayscale-500)',
					600: 'var(--color-grayscale-600)',
					700: 'var(--color-grayscale-700)',
					800: 'var(--color-grayscale-800)',
					900: 'var(--color-grayscale-900)',
					950: 'var(--color-grayscale-950)',
				},
			},
			// fontFamily: {
			// 	sans: ['var(--font-sans)', 'sans-serif'],
			// 	mono: ['var(--font-mono)', 'monospace'],
			// },
		},
	},
	darkMode: 'class',
};

