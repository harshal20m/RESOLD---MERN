import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewItem() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("price", price);
		if (image) {
			formData.append("images", image);
		}

		await axios.post("http://localhost:5000/items", formData, {
			headers: {
				Authorization: token,
				"Content-Type": "multipart/form-data",
			},
		});
		navigate("/items");
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">Create New Item</h1>
			<form onSubmit={handleSubmit} className="mt-4">
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="border p-2 w-full"
				/>
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="border p-2 w-full mt-4"
				/>
				<input
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className="border p-2 w-full mt-4"
				/>
				<input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 w-full mt-4" />
				<button type="submit" className="bg-blue-500 text-white p-2 mt-4">
					Create Item
				</button>
			</form>
		</div>
	);
}

export default NewItem;
