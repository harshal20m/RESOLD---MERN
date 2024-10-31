import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api";
import { toast } from "react-toastify";

function Navbar() {
	const [profileImage, setProfileImage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [username, setUserName] = useState("");

	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		if (userId) {
			const fetchUserData = async () => {
				try {
					const response = await axiosInstance.get(`/users/${userId}`);
					setProfileImage(response.data.user.profileImage);
					setUserName(response.data.user.username);
				} catch (error) {
					console.error(error);
				}
			};
			fetchUserData();
		}
	}, [userId]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		toast.success("Logged out!");
		navigate("/");
	};

	const handleSearch = (e) => {
		e.preventDefault();
		navigate(`/search?query=${searchQuery}`);
	};

	return (
		<nav className="bg-gradient-navbar p-4 bg-slate-200 dark:bg-gray-800">
			<div className="mx-auto flex justify-between items-center">
				<Link to="/">
					<div className="text-black dark:text-white font-bold text-2xl mr-3">
						RES<span className="text-red-500">OLD</span>
					</div>
				</Link>
				{/* Upper Search Bar - Hide on mobile */}
				<div className="flex items-center sm:block hidden">
					<form onSubmit={handleSearch} className="relative max-w-md mx-auto">
						<label
							htmlFor="default-search"
							className="mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
						>
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="search"
								id="default-search"
								className="block w-full xs:m-5 mr-3 py-2.5 pl-10 pr-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search items..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								required
							/>
							<button
								type="submit"
								className="text-white absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Search
							</button>
						</div>
					</form>
				</div>
				<div className="flex items-center">
					{token && (
						<>
							<p className=" m-2 text-gray-800 dark:text-white font-semibold">Hi, {username}</p>
							<div className="dropdown dropdown-end  mobile:block">
								<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
									<div className="w-10 rounded-full">
										{profileImage ? (
											<img alt="user" src={profileImage} />
										) : (
											<img
												src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image-337x279.png"
												alt="user"
												className="w-10 h-10 rounded-full"
											/>
										)}
									</div>
								</div>
								<ul
									tabIndex={0}
									className="z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-300    text-black rounded-box w-48 dark:bg-gray-800 mt-5 dark:text-white"
								>
									<li>
										<Link
											to={`/profile/${userId}`}
											className="hover:bg-blue-100 dark:hover:bg-gray-700"
										>
											<div className="justify-between text-gray-800 dark:text-white font-semibold">
												Profile
												<span className="badge ml-16 bg-blue-500 text-white text-xs">New</span>
											</div>
										</Link>
									</li>
									<li>
										{token && (
											<Link to="/new-item" className="hover:bg-green-100 dark:hover:bg-gray-700">
												<div>Create Ad</div>
											</Link>
										)}
									</li>
									<li>
										<div
											className="hover:bg-red-400 dark:hover:bg-red-600"
											onClick={() => document.getElementById("my_modal_1").showModal()}
										>
											Logout
											<dialog id="my_modal_1" className="modal">
												<div className="modal-box">
													<h3 className="font-bold text-lg">Logout</h3>
													<p className="py-4">
														Are you sure to Logout of your Account! , See you Soon!.....
													</p>
													<div className="modal-action">
														<form method="dialog">
															<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
																✕
															</button>
															<button
																className="btn hover:bg-red-400 dark:hover:bg-red-600"
																onClick={handleLogout}
															>
																Logout
															</button>
														</form>
													</div>
												</div>
											</dialog>
										</div>
									</li>
								</ul>
							</div>
						</>
					)}
					{!token && (
						<div className="flex p-2 bg-slate-300 rounded-xl">
							<Link to="/new-item" className="text-white mr-3">
								<div className="flex justify-center items-center gap-2">
									<i className="bx bx-plus hidden text-gray-800 dark:text-white font-semibold sm:block mt-1"></i>
									<p className="text-gray-800 dark:text-white font-semibold">Create ad</p>
								</div>
							</Link>
							|
							<Link to="/login" className="ml-4 font-semibold text-gray-800 dark:text-white">
								Login
							</Link>
						</div>
					)}
				</div>
			</div>

			{/* Lower Search Bar - Only shown on mobile */}
			<div className="sm:hidden mt-4">
				<div className="flex items-center">
					<form onSubmit={handleSearch} className="relative max-w-md mx-auto">
						<label
							htmlFor="default-search"
							className="mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
						>
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="search"
								id="default-search"
								className="block w-full xs:m-5 mr-3 py-2.5 pl-10 pr-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search items..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								required
							/>
							<button
								type="submit"
								className="text-white absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Search
							</button>
						</div>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
