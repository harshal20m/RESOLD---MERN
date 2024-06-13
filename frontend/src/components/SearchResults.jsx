import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function SearchResults() {
	const [items, setItems] = useState([]);
	const query = useQuery().get("query");

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/items`, {
					params: { search: query },
				});
				setItems(response.data.items);
			} catch (error) {
				console.error(error);
			}
		};

		if (query) {
			fetchItems();
		}
	}, [query]);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Search Results</h1>
			{items.length === 0 && <p>No items found</p>}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{items.map((item) => (
					<div key={item._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
						{item.images.length > 0 && (
							<img
								src={`http://localhost:5000/${item.images[0]}`}
								alt={item.title}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
						)}
						<div className="p-5">
							<h5 className="text-2xl font-bold tracking-tight text-gray-900">{item.title}</h5>
							<p className="font-normal text-gray-700">{item.description}</p>
							<p className="text-blue-500 mt-2">Price: ${item.price}</p>
							<Link
								to={`/items/${item._id}`}
								className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
							>
								View Details
								<svg
									className="w-3.5 h-3.5 ml-2"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 10"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M1 5h12m0 0L9 1m4 4L9 9"
									/>
								</svg>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default SearchResults;
