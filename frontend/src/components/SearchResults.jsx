import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../api";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function SearchResults() {
	const [items, setItems] = useState([]);
	const query = useQuery().get("query");

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await axiosInstance.get(`/items`, {
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
		<div className="bg-gradient-180 mx-auto p-4">
			{items.length === 0 ? (
				<>
					<p className="text-white mt-60 flex items-center justify-center text-3xl">No items found</p>
					<div className="h-[57.5vh]"></div>
				</>
			) : (
				<h1 className="text-2xl font-bold mb-4 text-black">Search Results for {query}</h1>
			)}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{items.map((item) => (
					<div key={item._id} className="max-w-sm  bg-gradient-180 rounded-lg shadow">
						{item.images.length > 0 && (
							<img
								src={item.images[0].url}
								alt={item.title}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
						)}
						<div className="p-5">
							<h5 className="text-2xl font-bold tracking-tight text-white ">{item.title}</h5>
							<p className="font-normal text-black">{item.description}</p>
							<p className="text-white mt-2">Price: ₹ {item.price}</p>
							<p className="text-white mt-2 mb-2">Seller : {item.user.username}</p>
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
