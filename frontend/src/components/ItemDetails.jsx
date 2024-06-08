import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddImages from "./AddImages";

function ItemDetails() {
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const [user, setUser] = useState(null);
	const [mainImage, setMainImage] = useState("");

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/items/${id}`);
				setItem(response.data.items);
				setUser(response.data.userid);

				setMainImage(response.data.items.images[0]);
			} catch (error) {
				console.error(error);
			}
		};
		fetchItem();
	}, [id]);

	if (!item) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-6 flex flex-wrap">
			<div className="image-section w-full md:w-1/2 p-4">
				<img src={`http://localhost:5000/${mainImage}`} alt="Main Product" className="w-auto h-96 rounded" />
				<div className="thumbnails flex mt-4 space-x-4">
					{item.images.map((image, index) => (
						<img
							key={index}
							src={`http://localhost:5000/${image}`}
							alt={`Thumbnail ${index + 1}`}
							className="w-24 h-24 object-cover cursor-pointer rounded"
							onClick={() => setMainImage(image)}
						/>
					))}
				</div>
			</div>
			<div className="details-section w-full md:w-1/2 p-4">
				<h1 className="text-3xl font-bold">{item.title}</h1>

				<div className="text-green-600"> Available</div>
				<p className="my-4 text-white	">{item.description}</p>
				<div className="price text-3xl font-bold text-red-500">
					RS. {item.price} <span className="text-gray-800 text-base">+12% GST Added</span>
				</div>
				<button className="bg-blue-500 text-white px-6 py-3 rounded mt-4">Buy Now</button>
				<div className="seller-info mt-6">
					<h2 className="text-2xl font-bold mb-4">Seller Information</h2>
					{user && (
						<div className="text-black">
							<p>
								Name: <span className="text-white">{user.username}</span>
							</p>
							<p>
								Contact: <span className="text-white">{user.contact}</span>
							</p>
							<p>
								Email id: <span className="text-white">{user.email}</span>
							</p>
						</div>
					)}
				</div>
				{item.user === localStorage.getItem("userId") && (
					<div className="mt-6 ">
						<AddImages itemId={item._id} />
					</div>
				)}
			</div>
		</div>
	);
}

export default ItemDetails;
