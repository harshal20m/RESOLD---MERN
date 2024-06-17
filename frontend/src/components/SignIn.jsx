import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [profileImagePreview, setProfileImagePreview] = useState(null);
	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setProfileImage(file);
		setProfileImagePreview(URL.createObjectURL(file));
	};

	const handleSignup = async (e) => {
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
			toast.success("Registration Successful!");

			// Redirect to login form
			setIsLoginForm(true);
			resetForm();
		} catch (error) {
			setMessage("Error registering user");
			toast.error("Error registering user");
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("http://localhost:5000/login", { username, password });
			localStorage.setItem("token", data.token);
			localStorage.setItem("userId", data._id);
			toast.success("Login successful");
			navigate("/");
		} catch (error) {
			toast.error("Invalid credentials");
		}
	};

	const toggleForm = () => {
		setIsLoginForm(!isLoginForm);
		setMessage("");
		resetForm();
	};

	const resetForm = () => {
		setUsername("");
		setPassword("");
		setContact("");
		setAddress("");
		setEmail("");
		setProfileImage(null);
		setProfileImagePreview(null);
	};

	return (
		<div
			className="relative w-full h-screen overflow-hidden"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="absolute w-full h-full top-0 left-0">
				<div
					className={`absolute inset-0 transition-all duration-500 ${
						isHovered ? "transform translate-x-[200px]" : ""
					}`}
				>
					<div className="bg-[#e46569] absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax] -mt-[100vmax] transform origin-left rotate-45 opacity-65 transition-all duration-500 delay-200"></div>
					<div className="bg-[#ecaf81] absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax] -mt-[100vmax] transform origin-left rotate-[135deg] opacity-65 transition-all duration-500 delay-200"></div>
				</div>
				<div
					className={`absolute inset-0 transition-all duration-500 ${
						isHovered ? "transform -translate-x-[200px]" : ""
					}`}
				>
					<div className="bg-[#60b8d4] absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax] -mt-[100vmax] transform origin-left -rotate-45 opacity-65 transition-all duration-500 delay-200"></div>
					<div className="bg-[#3745b5] absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax] -mt-[100vmax] transform origin-left -rotate-[135deg] opacity-65 transition-all duration-500 delay-200"></div>
				</div>
			</div>

			<div
				className={`absolute w-[400px] h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-8 transition-opacity duration-500 ${
					isHovered ? "opacity-100 delay-200" : "opacity-0"
				}`}
			>
				{isLoginForm ? (
					<div className="w-96 backdrop-blur-xs bg-opacity-60 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
						<h2 className="text-2xl font-bold pb-5">Login</h2>
						<form onSubmit={handleLogin}>
							<div className="mb-4">
								<label htmlFor="username" className="block mb-2 text-sm font-medium">
									Username
								</label>
								<input
									type="text"
									id="username"
									className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
									placeholder=" "
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="password" className="block mb-2 text-sm font-medium">
									Password
								</label>
								<input
									type="password"
									id="password"
									className="bg-gray-100 border inline border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
									placeholder=" "
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							{message && (
								<div className="text-red-500 pb-5">
									<p>{message}</p>
								</div>
							)}
							<div className="flex items-center justify-between mb-4">
								<button
									type="submit"
									className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
								>
									Login
								</button>
								<div className="flex items-center text-sm">
									<p>Dont have an account?</p>
									<p className="underline cursor-pointer ml-1" onClick={toggleForm}>
										Register Here
									</p>
								</div>
							</div>
						</form>
					</div>
				) : (
					<div className="w-96 backdrop-blur-xs bg-opacity-60 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
						<h2 className="text-2xl font-bold pb-5">SignUp</h2>
						<form onSubmit={handleSignup}>
							<div className="mb-4">
								<label htmlFor="username" className="block mb-2 text-sm font-medium">
									Username
								</label>
								<input
									type="text"
									id="username"
									className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
									placeholder=" "
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="email" className="block mb-2 text-sm font-medium">
									Email
								</label>
								<input
									type="email"
									id="email"
									className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
									placeholder=""
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="contact" className="block mb-2 text-sm font-medium">
									Contact
								</label>
								<input
									type="number"
									id="contact"
									className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
									placeholder="+91"
									required
									value={contact}
									onChange={(e) => setContact(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="address" className="block mb-2 text-sm font-medium">
									Address
								</label>
								<input
									type="text"
									id="address"
									className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
									placeholder="City, State"
									required
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<div className="flex space-x-4">
									<div className="w-1/2">
										<label htmlFor="password" className="block mb-2 text-sm font-medium">
											Password
										</label>
										<input
											type="password"
											id="password"
											className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
											placeholder=""
											required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<div className="w-1/2">
										<label htmlFor="cpassword" className="block mb-2 text-sm font-medium">
											Confirm Password
										</label>
										<input
											type="password"
											id="cpassword"
											className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
											placeholder=""
											required
										/>
									</div>
								</div>
							</div>
							<div className="mb-4">
								<label htmlFor="profileImage" className="block mb-2 text-sm font-medium">
									Profile Image
								</label>
								<input
									type="file"
									id="profileImage"
									className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
									onChange={handleImageChange}
								/>
							</div>
							<div className="mb-4">
								{profileImagePreview && (
									<img
										src={profileImagePreview}
										alt="Profile Preview"
										className="w-32 h-32 object-cover mb-2"
									/>
								)}
							</div>
							{message && (
								<div className="text-red-500 pb-5">
									<p>{message}</p>
								</div>
							)}
							<div className="flex items-center justify-between mb-4">
								<button
									type="submit"
									className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
								>
									Register
								</button>
								<div className="flex items-center text-sm">
									<p>Already have an account?</p>
									<p className="underline cursor-pointer ml-1" onClick={toggleForm}>
										Sign in
									</p>
								</div>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default SignIn;
