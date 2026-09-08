/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				ink: {
					DEFAULT: '#050505',
					card: '#111111',
					line: '#222222'
				},
				accent: {
					DEFAULT: '#D70C0C',
					soft: '#F01414',
					deep: '#8E0808'
				},
				muted: '#A1A1A1'
			},
			fontFamily: {
				premium: ['var(--font-premium)'],
				secondary: ['var(--font-secondary)'],
				sans: ['var(--font-secondary)']
			},
			letterSpacing: {
				tightest: '-0.05em'
			},
			maxWidth: {
				edge: '1440px'
			},
			transitionTimingFunction: {
				premium: 'cubic-bezier(0.22, 1, 0.36, 1)'
			}
		}
	},
	plugins: []
}
