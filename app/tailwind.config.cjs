/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				dark1: '#151619',
				dark2: '#1D1F22',
				dark3: '#2B2D31',
				dark4: '#35393F',
				mid1: '#5A6069',
				mid2: '#7C8187',
				mid3: '#C1C4CB',
				light1: '#E4E4E4',
				light2: '#F5F5F5',
				light3: '#FFFFFF',
				orange1: '#E46643',
				orange2: '#F39765',
			},
			fontFamily: {
				Roboto: ['Roboto', 'sans-serif'],
				'Roboto-Mono': ['Roboto Mono', 'monospace'],
				'Roboto-Slab': ['Roboto Slab', 'serif'],
			},
		},
	},
	plugins: [],
}
