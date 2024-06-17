import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProfile() {
	const [username, setUsername] = useState("");
	const [contact, setContact] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [previewImage, setPreviewImage] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			const userId = localStorage.getItem("userId");
			const response = await axios.get(`http://localhost:5000/users/${userId}`);
			setUsername(response.data.user.username);
			setContact(response.data.user.contact);
			setAddress(response.data.user.address);
			setEmail(response.data.user.email);
			setProfileImage(response.data.user.profileImage);
			setPreviewImage(`http://localhost:5000/${response.data.user.profileImage}`);
		};

		fetchUserData();
	}, []);

	const handleFileChange = (e) => {
		setProfileImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		const formData = new FormData();
		formData.append("username", username);
		formData.append("contact", contact);
		formData.append("address", address);
		formData.append("email", email);
		if (password) {
			formData.append("password", password);
		}
		if (profileImage) {
			formData.append("profileImage", profileImage);
		}

		try {
			await axios.put(`http://localhost:5000/users/${userId}`, formData, {
				headers: {
					Authorization: `${token}`,
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Profile updated successfully");
			navigate(`/profile/${userId}`);
		} catch (error) {
			console.error("Error updating profile:", error);
			if (error.response && error.response.status === 401) {
				alert("Unauthorized. Please log in again.");
			}
		}
	};

	return (
		<div className="w-full bg-gradient-180 mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4 text-center text-black">
				Edit{"  "}
				<span className="text-white font-bold text-2xl">
					RES<span className="text-red-500">OLD</span>{" "}
				</span>
				Profile
			</h1>
			<form onSubmit={handleSubmit} className="max-w-md mx-auto">
				<div className="mb-4">
					<label className="block text-gray-700">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="border p-2 w-full rounded-lg bg-white border-slate-200 text-black"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Contact</label>
					<input
						type="text"
						value={contact}
						onChange={(e) => setContact(e.target.value)}
						className="border p-2 w-full rounded-lg bg-white border-slate-200 text-black"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="border p-2 w-full rounded-lg bg-white border-slate-200 text-black"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border p-2 w-full rounded-lg bg-white border-slate-200 text-black"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border p-2 w-full rounded-lg bg-white border-slate-200 text-black"
						placeholder="Leave blank to keep current password"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Profile Image</label>
					{previewImage && (
						<img
							className="h-36 w-36 mb-2 border rounded-lg bg-white border-slate-200 text-black"
							src={previewImage}
							alt="Profile Preview"
						/>
					)}
					<input
						type="file"
						onChange={handleFileChange}
						className="border p-2 w-full rounded-lg bg-white border-slate-200 text-black"
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
