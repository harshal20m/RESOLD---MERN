import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditItem() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [oldImage, setOldImage] = useState("");
	const [newImages, setNewImages] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/items/${id}`)
			.then((response) => {
				const item = response.data.items;
				setTitle(item.title || "");
				setDescription(item.description || "");
				setPrice(item.price || "");
				setOldImage(item.images[0] || ""); // Assuming images is an array
			})
			.catch((error) => console.error(error));
	}, [id]);

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setNewImages(files);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("price", price);
		newImages.forEach((image) => {
			formData.append("images", image); // Append each selected image
		});

		try {
			const userId = localStorage.getItem("userId");

			await axios.put(`http://localhost:5000/items/${id}`, formData, {
				headers: {
					Authorization: `${token}`, // Make sure the token is prefixed with 'Bearer '
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Item edited Successfully !");
			navigate(`/profile/${userId}`);
		} catch (error) {
			console.error(error);
			toast.error("Failed to update item");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">Edit Item</h1>
			<form onSubmit={handleSubmit} className="mt-4">
				<div className="mb-4">
					<label className="block text-gray-700">Title</label>
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border p-2 w-full"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Description</label>
					<input
						type="text"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="border p-2 w-full"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Price</label>
					<input
						type="number"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="border p-2 w-full"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Old Image</label>
					{oldImage && (
						<img
							src={`http://localhost:5000/${oldImage}`}
							alt="Old"
							className="w-32 h-32 object-cover mb-2"
						/>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">New Images</label>
					<input type="file" onChange={handleImageChange} multiple className="border p-2 w-full" />
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Image Previews</label>
					<div className="flex flex-wrap">
						{newImages.map((image, index) => (
							<img
								key={index}
								src={URL.createObjectURL(image)}
								alt={`New Preview ${index}`}
								className="w-32 h-32 object-cover mb-2 mr-2"
							/>
						))}
					</div>
				</div>
				<button type="submit" className="bg-blue-500 text-white p-2 mt-4">
					Update Item
				</button>
			</form>
		</div>
	);
}

export default EditItem;
