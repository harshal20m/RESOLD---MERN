import axios from "axios";

const axiosInstance = axios.create({
	// baseURL: "http://localhost:5000/", // Your backend base URL
	baseURL: "http://3.88.133.68:5000/",
});

export default axiosInstance;
