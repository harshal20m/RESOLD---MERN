import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
					const response = await axios.get(`http://localhost:5000/users/${userId}`);
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
		toast.success("Logged out !");
		navigate("/");
	};

	const handleSearch = (e) => {
		e.preventDefault();
		navigate(`/search?query=${searchQuery}`);
	};

	return (
		<>
			<nav className="bg-gradient-navbar p-4">
				<div className="container mx-auto flex justify-between items-center">
					<Link to="/">
						<div className="text-white text-2xl mr-3">OLX</div>
					</Link>
					<div className="flex items-center">
						<form onSubmit={handleSearch} className="relative max-w-md mx-auto">
							<label
								htmlFor="default-search"
								className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
								<p className="text-white hidden sm:block">Hi, {username}</p>
								<div className="dropdown dropdown-end hidden mobile:block">
									<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
										<div className="w-10 rounded-full">
											{profileImage ? (
												<img alt="user" src={`http://localhost:5000/${profileImage}`} />
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
										className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gradient-blue text-black rounded-box w-48"
									>
										<li>
											<Link to={`/profile/${userId}`} className="hover:bg-blue-100">
												<div className="justify-between">
													Profile
													<span className="badge ml-16  bg-blue-500 text-white text-xs">
														New
													</span>
												</div>
											</Link>
										</li>
										<li>
											{token && (
												<Link to="/new-item" className="hover:bg-green-100">
													<div>Create Ad</div>
												</Link>
											)}
										</li>
										<li>
											<div
												className="hover:bg-red-400"
												onClick={() => document.getElementById("my_modal_1").showModal()}
											>
												{/* Open the modal using document.getElementById('ID').showModal() method */}
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
																{/* if there is a button in form, it will close the modal */}
																<button
																	className="btn hover:bg-red-400"
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
							<>
								<Link to="/new-item" className="  text-white">
									<div>
										<p className="hidden sm:block">Create add</p>
										<i className="bx bx-plus hidden xs:block"></i>
									</div>
								</Link>

								<Link to="/login" className="ml-4 text-white">
									Login
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
