// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Navbar() {
// 	const [profileImage, setProfileImage] = useState("");
// 	const [searchQuery, setSearchQuery] = useState("");

// 	const userId = localStorage.getItem("userId");
// 	const navigate = useNavigate();
// 	const token = localStorage.getItem("token");

// 	// const userId = localStorage.getItem("userId");
// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			const response = await axios.get(`http://localhost:5000/users/${userId}`);
// 			setProfileImage(response.data.user.profileImage);
// 		};

// 		fetchUserData();
// 	}, []);
// 	const handleLogout = () => {
// 		localStorage.removeItem("token");
// 		localStorage.removeItem("userId");
// 		navigate("/login");
// 	};

// 	const handleSearch = (e) => {
// 		e.preventDefault();
// 		navigate(`/search?query=${searchQuery}`);
// 	};

// 	return (
// 		<nav className="bg-gray-800 p-4">
// 			<div className="container mx-auto flex justify-between items-center">
// 				<div className="flex">
// 					<Link to="/" className="text-white text-2xl ">
// 						OLX
// 					</Link>
// 					{token && (
// 						<Link to="/new-item" className="ml-4 text-white">
// 							Add Items
// 						</Link>
// 					)}
// 				</div>
// 				<div className="flex items-center">
// 					<form onSubmit={handleSearch} className="relative max-w-md mx-auto">
// 						<label
// 							htmlFor="default-search"
// 							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
// 						>
// 							Search
// 						</label>
// 						<div className="relative">
// 							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
// 								<svg
// 									className="w-4 h-4 text-gray-500 dark:text-gray-400"
// 									aria-hidden="true"
// 									xmlns="http://www.w3.org/2000/svg"
// 									fill="none"
// 									viewBox="0 0 20 20"
// 								>
// 									<path
// 										stroke="currentColor"
// 										strokeLinecap="round"
// 										strokeLinejoin="round"
// 										strokeWidth="2"
// 										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
// 									/>
// 								</svg>
// 							</div>
// 							<input
// 								type="search"
// 								id="default-search"
// 								className="block w-full py-2.5 pl-10 pr-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// 								placeholder="Search items..."
// 								value={searchQuery}
// 								onChange={(e) => setSearchQuery(e.target.value)}
// 								required
// 							/>
// 							<button
// 								type="submit"
// 								className="text-white absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
// 							>
// 								Search
// 							</button>
// 						</div>
// 					</form>
// 				</div>
// 				<div className="flex items-center">
// 					{token && (
// 						<>
// 							<Link to={`/profile/${userId}`}>
// 								{profileImage ? (
// 									<img
// 										src={`http://localhost:5000/${profileImage}`}
// 										alt="Profile"
// 										className="w-10 h-10 rounded-full"
// 									/>
// 								) : (
// 									<img
// 										src="/docs/images/people/profile-picture-5.jpg"
// 										alt="Default avatar"
// 										className="w-10 h-10 rounded-full"
// 									/>
// 								)}
// 							</Link>
// 							<button onClick={handleLogout} className="ml-4 text-white">
// 								Logout
// 							</button>
// 						</>
// 					)}
// 					{!token && (
// 						<>
// 							<Link to="/signup" className="ml-4 text-white">
// 								Signup
// 							</Link>
// 							<Link to="/login" className="ml-4 text-white">
// 								Login
// 							</Link>
// 						</>
// 					)}
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }

// export default Navbar;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
	const [profileImage, setProfileImage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const userId = localStorage.getItem("userId");
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (userId) {
			console.log(userId);
			const fetchUserData = async () => {
				try {
					const response = await axios.get(`http://localhost:5000/users/${userId}`);
					setProfileImage(response.data.profileImage);
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
		navigate("/login");
		window.location.reload(); // Force reload to clear any state
	};

	const handleSearch = (e) => {
		e.preventDefault();
		navigate(`/search?query=${searchQuery}`);
	};

	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex">
					<Link to="/" className="text-white text-2xl">
						OLX
					</Link>
					{token && (
						<Link to="/new-item" className="ml-4 text-white">
							Add Items
						</Link>
					)}
				</div>
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
								className="block w-full py-2.5 pl-10 pr-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
							<Link to={`/profile/${userId}`}>
								{profileImage ? (
									<img
										src={`http://localhost:5000/${profileImage}`}
										alt="Profile"
										className="w-10 h-10 rounded-full"
									/>
								) : (
									<img
										src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image-337x279.png"
										alt="Default avatar"
										className="w-10 h-10 rounded-full"
									/>
								)}
							</Link>
							<button onClick={handleLogout} className="ml-4 text-white">
								Logout
							</button>
						</>
					)}
					{!token && (
						<>
							<Link to="/signup" className="ml-4 text-white">
								Signup
							</Link>
							<Link to="/login" className="ml-4 text-white">
								Login
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
