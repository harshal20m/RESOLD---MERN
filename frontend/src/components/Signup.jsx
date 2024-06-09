import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [profileImage, setProfileImage] = useState(null); // Added profileImage state
	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("username", username);
			formData.append("password", password);
			formData.append("contact", contact);
			formData.append("address", address);
			formData.append("email", email);
			if (profileImage) {
				formData.append("profileImage", profileImage);
			}
			await axios.post("http://localhost:5000/register", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setMessage("User registered successfully");
		} catch (error) {
			setMessage("Error registering user");
		}
		navigate("/login");
	};

	const handleImageChange = (e) => {
		setProfileImage(e.target.files[0]);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">Signup</h1>
			<form onSubmit={handleSubmit} className="mt-4">
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="border p-2 w-full"
					required
				/>
				<input
					type="text"
					placeholder="Contact +91"
					value={contact}
					onChange={(e) => setContact(e.target.value)}
					className="border p-2 w-full mt-4"
					required
				/>
				<input
					type="text"
					placeholder="Address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					className="border p-2 w-full mt-4"
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border p-2 w-full mt-4"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border p-2 w-full mt-4"
					required
				/>
				<input type="file" onChange={handleImageChange} className="mt-4" />
				<button type="submit" className="bg-blue-500 text-white p-2 mt-4">
					Signup
				</button>
			</form>
			{message && <p className="mt-4 text-red-500">{message}</p>}
		</div>
	);
}

export default Signup;
