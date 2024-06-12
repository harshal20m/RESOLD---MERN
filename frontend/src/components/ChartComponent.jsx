// ChartComponent.js
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

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

	return <Bar data={data} options={options} />;
};

export default ChartComponent;
