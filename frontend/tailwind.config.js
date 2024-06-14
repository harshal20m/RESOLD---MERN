/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
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
