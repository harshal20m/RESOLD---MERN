import { useState } from "react";
import axios from "axios";

function AddImages({ itemId }) {
	const [images, setImages] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const formData = new FormData();
		images.forEach((image) => formData.append("images", image));

		try {
			await axios.put(`http://localhost:5000/items/${itemId}/add-images`, formData, {
				headers: {
					authorization: token,
					"Content-Type": "multipart/form-data",
				},
			});
			alert("Images added successfully");
		} catch (error) {
			alert("Failed to add images: " + error.response.data);
		}
		window.location.reload();
	};

	return (
		<form onSubmit={handleSubmit} className="mt-4">
			<input
				type="file"
				multiple
				onChange={(e) => setImages([...e.target.files])}
				className="border p-2 w-full"
			/>
			<button type="submit" className="bg-blue-500 text-white p-2 mt-4">
				Add Images
			</button>
		</form>
	);
}

export default AddImages;
