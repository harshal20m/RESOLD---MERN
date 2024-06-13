import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Items() {
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const navigate = useNavigate();

	const fetchItems = async (page) => {
		try {
			const response = await axios.get("http://localhost:5000/items", {
				params: { page, limit: 6 },
			});
			setItems(response.data.items);
			setCurrentPage(response.data.currentPage);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchItems(currentPage);
	}, [currentPage]);

	const handleDelete = async (id) => {
		const token = localStorage.getItem("token");
		await axios.delete(`http://localhost:5000/items/${id}`, {
			headers: {
				Authorization: token,
			},
		});
		fetchItems(currentPage);
	};

	const handleEdit = (id) => {
		navigate(`/edit-item/${id}`);
	};

	const userId = localStorage.getItem("userId"); // Get the user ID from local storage

	return (
		<div className="flex flex-col mx-auto min-h-screen ">
			<div className="container mx-auto p-4 flex-grow">
				<h1 className="text-2xl font-bold mb-4 text-white">Items for Sale</h1>
				<div className="grid mx-auto grid-cols-1 md:grid-cols-3 gap-6 ">
					{items.map((item) => (
						<div
							key={item._id}
							className="max-w-xs  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
						>
							{item.images.length > 0 && (
								<Link to={`/items/${item._id}`}>
									<img
										className="rounded-t-lg w-full h-48 object-cover"
										src={`http://localhost:5000/${item.images[0]}`}
										alt={item.title}
									/>
								</Link>
							)}
							<div className="p-5 flex flex-col ">
								<Link to={`/items/${item._id}`}>
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										{item.title}
									</h5>
								</Link>
								<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
								<p className="text-blue-500 mb-4">Price: ₹ {item.price}/-</p>
								<p className="text-gray-500 mb-4">
									Seller: {item.user ? item.user.username : "Unknown"}
								</p>
								<div className="flex justify-between items-center">
									<Link
										to={`/items/${item._id}`}
										className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										View Details
										<svg
											className="w-3.5 h-3.5 ms-2"
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
									{item.user && item.user._id === userId && (
										<div className="flex space-x-2">
											<button
												onClick={() => handleEdit(item._id)}
												className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm"
											>
												Edit
											</button>
											<button
												className="bg-red-500 px-3 py-2 rounded-lg text-sm text-white"
												onClick={() => document.getElementById("my_modal_5").showModal()}
											>
												Delete
											</button>
											<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
												<div className="modal-box bg-red-500 text-white">
													<h3 className="font-bold text-lg">Delete</h3>
													<p className="py-4">
														Are you sure to delete current item. Changes will not be revert
														!
													</p>
													<div className="modal-action">
														<form method="dialog">
															{/* if there is a button in form, it will close the modal */}
															<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
																✕
															</button>
															<button
																className="btn hover:bg-red-800 hover:text-white"
																onClick={() => handleDelete(item._id)}
															>
																Delete
															</button>
														</form>
													</div>
												</div>
											</dialog>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{totalPages > 1 && (
				<div className="flex justify-center items-center py-4 dark:bg-gray-700">
					<button
						onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
						className="px-2 py-0.5 mx-0.5 text-2xl   "
						disabled={currentPage === 1}
					>
						<i className="bx bx-chevrons-left bx-fade-left"></i>
					</button>
					{Array.from({ length: totalPages }, (_, index) => (
						<button
							key={index}
							onClick={() => setCurrentPage(index + 1)}
							className={`px-2 py-0.5 mx-0.5 text-xs rounded-full ${
								currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
							}`}
						>
							{index + 1}
						</button>
					))}
					<button
						onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
						className="px-2 py-0.5 mx-0.5 text-2xl   "
						disabled={currentPage === totalPages}
					>
						<i className="bx bx-chevrons-right bx-fade-right"></i>
					</button>
				</div>
			)}
		</div>
	);
}

export default Items;
