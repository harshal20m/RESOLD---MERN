// ChartComponent.js
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ items }) => {
	const data = {
		labels: items.map((item) => item.title),
		datasets: [
			{
				label: "Prices of Items",
				data: items.map((item) => item.price),
				backgroundColor: "rgba(75, 192, 192, 0.6)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Prices of Items",
			},
		},
	};

	return (
		<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4">
			<div className="relative h-64 sm:h-80 md:h-96">
				<Bar data={data} options={options} />
			</div>
		</div>
	);
};

export default ChartComponent;
