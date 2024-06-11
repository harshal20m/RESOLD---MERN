// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function NewItem() {
// 	const [title, setTitle] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [price, setPrice] = useState("");
// 	const [image, setImage] = useState(null);
// 	const navigate = useNavigate();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const token = localStorage.getItem("token");
// 		const formData = new FormData();
// 		formData.append("title", title);
// 		formData.append("description", description);
// 		formData.append("price", price);
// 		if (image) {
// 			formData.append("images", image);
// 		}

// 		await axios.post("http://localhost:5000/items", formData, {
// 			headers: {
// 				Authorization: token,
// 				"Content-Type": "multipart/form-data",
// 			},
// 		});
// 		navigate("/items");
// 	};

// 	return (
// 		<div className="container mx-auto p-4">
// 			<h1 className="text-2xl font-bold">Create New Item</h1>
// 			<form onSubmit={handleSubmit} className="mt-4">
// 				<input
// 					type="text"
// 					placeholder="Title"
// 					value={title}
// 					onChange={(e) => setTitle(e.target.value)}
// 					className="border p-2 w-full"
// 				/>
// 				<input
// 					type="text"
// 					placeholder="Description"
// 					value={description}
// 					onChange={(e) => setDescription(e.target.value)}
// 					className="border p-2 w-full mt-4"
// 				/>
// 				<input
// 					type="number"
// 					placeholder="Price"
// 					value={price}
// 					onChange={(e) => setPrice(e.target.value)}
// 					className="border p-2 w-full mt-4"
// 				/>
// 				<input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 w-full mt-4" />
// 				<button type="submit" className="bg-blue-500 text-white p-2 mt-4">
// 					Create Item
// 				</button>
// 			</form>
// 		</div>
// 	);
// }

// export default NewItem;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewItem() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [images, setImages] = useState([]);
	const [status, setStatus] = useState("available");
	const [category, setCategory] = useState("Electronics");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("status", status);
		formData.append("category", category);
		if (images.length > 0) {
			for (let i = 0; i < images.length; i++) {
				formData.append("images", images[i]);
			}
		}

		await axios.post("http://localhost:5000/items", formData, {
			headers: {
				Authorization: `${token}`,
				"Content-Type": "multipart/form-data",
			},
		});
		navigate("/");
	};

	const handleImageChange = (e) => {
		setImages([...e.target.files]);
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
					required
				/>
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="border p-2 w-full mt-4"
					required
				/>
				<input
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className="border p-2 w-full mt-4"
					required
				/>
				<input type="file" multiple onChange={handleImageChange} className="border p-2 w-full mt-4" required />
				<select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full mt-4">
					<option value="available">Available</option>
					<option value="unavailable">Unavailable</option>
				</select>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="border p-2 w-full mt-4"
				>
					<option value="Electronics">Electronics</option>
					<option value="Home Appliances">Home Appliances</option>
					<option value="Fitness">Fitness</option>
					<option value="Gadgets">Gadgets</option>
					<option value="Clothing & Accessories">Clothing & Accessories</option>
					<option value="Toys & Games">Toys & Games</option>
					<option value="Kitchen & Dining">Kitchen & Dining</option>
					<option value="Office Supplies">Office Supplies</option>
					<option value="Outdoor & Garden">Outdoor & Garden</option>
					<option value="Sports & Recreation">Sports & Recreation</option>
					<option value="Books & Media">Books & Media</option>
					<option value="Furniture">Furniture</option>
				</select>
				<button type="submit" className="bg-blue-500 text-white p-2 mt-4">
					Create Item
				</button>
			</form>
		</div>
	);
}

export default NewItem;
