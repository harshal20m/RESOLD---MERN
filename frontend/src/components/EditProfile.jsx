import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			const userId = localStorage.getItem("userId");
			const response = await axios.get(`http://localhost:5000/users/${userId}`);
			setUsername(response.data.username);
		};

		fetchUserData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("userId");
		await axios.put(`http://localhost:5000/users/${userId}`, { username, password });
		alert("Profile updated successfully");
		navigate("/profile");
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
					<label className="block text-gray-700">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
