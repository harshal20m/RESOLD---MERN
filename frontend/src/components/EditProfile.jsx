// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function EditProfile() {
// 	const [username, setUsername] = useState("");
// 	const [contact, setContact] = useState("");
// 	const [address, setAddress] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [profileImage, setProfileImage] = useState(null);
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			const userId = localStorage.getItem("userId");
// 			const response = await axios.get(`http://localhost:5000/users/${userId}`);
// 			setUsername(response.data.username);
// 			setContact(response.data.user.contact);

// 			setAddress(response.data.user.address);
// 			setEmail(response.data.user.email);
// 		};

// 		fetchUserData();
// 	}, []);

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const userId = localStorage.getItem("userId");

// 		const formData = new FormData();
// 		formData.append("username", username);
// 		formData.append("contact", contact);
// 		formData.append("address", address);
// 		formData.append("email", email);
// 		if (password) formData.append("password", password);
// 		if (profileImage) formData.append("profileImage", profileImage);

// 		await axios.put(`http://localhost:5000/users/${userId}`, formData, {
// 			headers: {
// 				"Content-Type": "multipart/form-data",
// 			},
// 		});

// 		alert("Profile updated successfully");
// 		navigate(`/profile/${userId}`);
// 	};

// 	return (
// 		<div className="container mx-auto p-4">
// 			<h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
// 			<form onSubmit={handleSubmit} className="max-w-md mx-auto">
// 				<div className="mb-4">
// 					<label className="block text-gray-700">Username</label>
// 					<input
// 						type="text"
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 						className="w-full p-2 border border-gray-300 rounded"
// 					/>
// 				</div>
// 				<div className="mb-4">
// 					<label className="block text-gray-700">Contact</label>
// 					<input
// 						type="text"
// 						value={contact}
// 						onChange={(e) => setContact(e.target.value)}
// 						className="w-full p-2 border border-gray-300 rounded"
// 					/>
// 				</div>
// 				<div className="mb-4">
// 					<label className="block text-gray-700">Address</label>
// 					<input
// 						type="text"
// 						value={address}
// 						onChange={(e) => setAddress(e.target.value)}
// 						className="w-full p-2 border border-gray-300 rounded"
// 					/>
// 				</div>
// 				<div className="mb-4">
// 					<label className="block text-gray-700">Email</label>
// 					<input
// 						type="email"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						className="w-full p-2 border border-gray-300 rounded"
// 					/>
// 				</div>
// 				<div className="mb-4">
// 					<label className="block text-gray-700">Password</label>
// 					<input
// 						type="password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						className="w-full p-2 border border-gray-300 rounded"
// 						placeholder="Leave blank to keep current password"
// 					/>
// 				</div>
// 				<div className="mb-4">
// 					<label className="block text-gray-700">Profile Image</label>
// 					<input
// 						type="file"
// 						onChange={(e) => setProfileImage(e.target.files[0])}
// 						className="w-full p-2 border border-gray-300 rounded"
// 					/>
// 				</div>
// 				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
// 					Save Changes
// 				</button>
// 			</form>
// 		</div>
// 	);
// }

// export default EditProfile;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
	const [username, setUsername] = useState("");
	const [contact, setContact] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			const userId = localStorage.getItem("userId");
			const response = await axios.get(`http://localhost:5000/users/${userId}`);
			setUsername(response.data.user.username);
			setContact(response.data.user.contact);
			setAddress(response.data.user.address);
			setEmail(response.data.user.email);
		};

		fetchUserData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage

		const userData = {
			username,
			contact,
			address,
			email,
			password: password || undefined, // Only include password if it's not empty
			profileImage, // Assuming profileImage is already a File object
		};

		try {
			const response = await axios.put(`http://localhost:5000/users/${userId}`, userData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Include the token in the Authorization header
				},
			});
			alert("Profile updated successfully");
			navigate(`/profile/${userId}`);
		} catch (error) {
			console.error("Error updating profile:", error);
			if (error.response && error.response.status === 401) {
				alert("Unauthorized. Please log in again.");
				// Optionally redirect to login page
			}
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
			<form onSubmit={handleSubmit} className="max-w-md mx-auto">
				<div className="mb-4">
					<label className="block text-gray-700">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Contact</label>
					<input
						type="text"
						value={contact}
						onChange={(e) => setContact(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
						placeholder="Leave blank to keep current password"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Profile Image</label>
					<input
						type="file"
						onChange={(e) => setProfileImage(e.target.files[0])}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
					Save Changes
				</button>
			</form>
		</div>
	);
}

export default EditProfile;
