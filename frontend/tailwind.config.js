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
				wave: {
					"0%, 100%": { transform: "scale(1)", opacity: 1 },
					"50%": { transform: "scale(0.8)", opacity: 0.7 },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease-in-out",
				"wave-1": "wave 1.2s ease-in-out infinite",
				"wave-2": "wave 1.2s ease-in-out infinite 0.1s",
				"wave-3": "wave 1.2s ease-in-out infinite 0.2s",
				"wave-4": "wave 1.2s ease-in-out infinite 0.3s",
				"wave-5": "wave 1.2s ease-in-out infinite 0.4s",
				"wave-6": "wave 1.2s ease-in-out infinite 0.5s",
			},
		},
	},
	plugins: [daisyui],
};
