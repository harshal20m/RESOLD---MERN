/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-180": "linear-gradient(to bottom, #88d3ce 0%, #6e45e2 100%);",
				"gradient-150": "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);",
				"gradient-140": "linear-gradient(180deg, #2af598 0%, #009efd 100%);",
				"gradient-white": "linear-gradient(to top, #dfe9f3 0%, white 100%);",
				"gradient-blue": "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);",
				"gradient-navbar":
					"linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);background-blend-mode: multiply;",
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
