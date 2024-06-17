/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-180": "linear-gradient(to bottom, #88d3ce 0%, #6e45e2 100%);",
				"gradient-150": "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);",
				"gradient-140": "linear-gradient (180deg, #2af598 0%, #009efd 100%);",
			},
			screens: {
				mobile: "370px",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease-in-out",
			},
		},
	},
	plugins: [daisyui],
};
