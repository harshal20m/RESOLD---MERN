// src/components/EditItem.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditItem() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	useEffect(() => {
		axios
			.get(`http://localhost:5000/items/${id}`)
			.then((response) => {
				setTitle(response.data.title);
				setDescription(response.data.description);
				setPrice(response.data.price);
			})
			.catch((error) => console.error(error));
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		await axios.put(
			`http://localhost:5000/items/${id}`,
			{ title, description, price },
			{
				headers: {
					Authorization: token,
				},
			}
		);
		navigate("/items");
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">Edit Item</h1>
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
				<button type="submit" className="bg-blue-500 text-white p-2 mt-4">
					Update Item
				</button>
			</form>
		</div>
	);
}

export default EditItem;
