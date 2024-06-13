import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("http://localhost:5000/login", { username, password });

			localStorage.setItem("token", data.token);
			localStorage.setItem("userId", data._id); // Store userId in local storage
			toast.success("Login successful");
			navigate("/");
		} catch (error) {
			toast("Invalid credentials");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">Login</h1>
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
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border p-2 w-full mt-4"
					required
				/>
				<button type="submit" className="bg-blue-500 text-white p-2 mt-4">
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
