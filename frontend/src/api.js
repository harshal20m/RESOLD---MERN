import axios from "axios";

const axiosInstance = axios.create({
	// baseURL: "http://localhost:5000/", // Your backend base URL
	baseURL: "https://resold-mern.onrender.com",
});

export default axiosInstance;
