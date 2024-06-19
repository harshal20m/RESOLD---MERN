import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddImages from "./AddImages";
import "./css/itemdetails.css";
import MapComponent from "./MapComponent";

function ItemDetails() {
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const [user, setUser] = useState(null);
	const [mainImage, setMainImage] = useState("");
	const [coordinates, setCoordinates] = useState([73.855167, 18.521526]);
	const [showLeftArrow, setShowLeftArrow] = useState("");
	const [showRightArrow, setShowRightArrow] = useState("true");
	const thumbnailsRef = useRef(null);

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/items/${id}`);
				setItem(response.data.items);
				setUser(response.data.userid);
				setMainImage(response.data.items.images[0]);
				setCoordinates(response.data.items.geometry.coordinates || "");
			} catch (error) {
				console.error(error);
			}
		};
		fetchItem();
	}, [id]);

	const handleScroll = () => {
		const container = thumbnailsRef.current;
		setShowLeftArrow(container.scrollLeft > 0);
		setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
	};

	useEffect(() => {
		if (thumbnailsRef.current) {
			handleScroll();
		}
	}, [item]);

	if (!item) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-gradient-180 w-full text-black mx-auto p-6 flex flex-wrap ">
			<div className="image-section w-full md:w-1/2 p-4 border sm:border-none rounded-lg mb-3">
				<img
					src={`http://localhost:5000/${mainImage}`}
					alt="Main Product"
					className="w-auto sm:h-96 rounded align-middle mx-auto"
				/>
				<div className="relative w-96 mt-4 mx-auto">
					{showLeftArrow && (
						<div
							className="slider-arrow left"
							onClick={() => thumbnailsRef.current.scrollBy({ left: -200, behavior: "smooth" })}
							style={{
								position: "absolute",
								top: "50%",
								left: "-40px",
								transform: "translateY(-50%)",
								zIndex: "1",
								cursor: "pointer",
							}}
						>
							<i className="bx bxs-left-arrow text-4xl   size-bold"></i>
						</div>
					)}
					<div
						ref={thumbnailsRef}
						className="thumbnails flex overflow-x-auto"
						style={{
							scrollbarWidth: "none", // Firefox
							msOverflowStyle: "none", // Edge
							"&::-webkit-scrollbar": {
								display: "none", // Chrome, Safari, Opera
							},
						}}
						onScroll={handleScroll}
					>
						{item.images.map((image, index) => (
							<img
								key={index}
								src={`http://localhost:5000/${image}`}
								alt={`Thumbnail ${index + 1}`}
								className="w-24 h-24 object-cover cursor-pointer rounded mx-1"
								onClick={() => setMainImage(image)}
							/>
						))}
					</div>
					{showRightArrow && (
						<div
							className="slider-arrow right"
							onClick={() => thumbnailsRef.current.scrollBy({ left: 200, behavior: "smooth" })}
							style={{
								position: "absolute",
								top: "50%",
								right: "-40px",
								transform: "translateY(-50%)",
								zIndex: "1",
								cursor: "pointer",
							}}
						>
							<i className="bx bxs-right-arrow text-4xl   size-bold"></i>
						</div>
					)}
				</div>
			</div>
			<div
				className="details-section bg-white bg-opacity-20   shadow-lg border border-cream rounded-lg w-full md:w-1/2 p-4 overflow-y-auto custom-scrollbar"
				style={{ maxHeight: "75vh" }}
			>
				<div className="text-3xl text-black font-bold flex flex-col justify-between sm:flex-row">
					<h1>
						{item.title}
						<i className="bx bxs-badge-check text-blue-600 align-middle ml-2"></i>
					</h1>
					<p
						className={`text-lg ${
							item.status === "available" ? "text-green-600" : "text-red-600"
						} capitalize`}
					>
						{item.status}
						<i className="bx bxs-purchase-tag bx-flashing align-middle ml-2"></i>
					</p>
				</div>
				<hr className="mt-3" />
				<div className="text-black">
					<p className="mt-5">Posted on : {item.createdAt.substring(0, 10)}</p>
					<p>Last updated on : {item.updatedAt.substring(0, 10)}</p>
					<p className="my-4">Description : {item.description}</p>
					<div className="price text-3xl font-bold text-gray-800">
						RS. {item.price} <span className="text-gray-800 text-xs  ">+12% GST Added</span>
					</div>
					<button className="bg-blue-500 text-white px-6 py-3 rounded mt-4">Contact Seller</button>
				</div>
				<hr className="mt-5" />

				<div className="seller-info mt-6">
					<h2 className="text-2xl font-bold mb-4">
						Seller Information <i className="bx bxs-info-circle text-gray-600"></i>
					</h2>
					{user && (
						<>
							<div className="text-black">
								<p className="mb-2">
									Name: <span>{user.username}</span>
								</p>
								{/* <p>
									Contact: <span>{user.contact}</span>
								</p>
								<p>
									Email id: <span>{user.email}</span>
								</p> */}
								<p>
									Address: <span>{user.address}</span>
								</p>
							</div>
						</>
					)}
					<hr className="mt-5" />
					{coordinates && coordinates.length === 2 && (
						<>
							<h2 className="text-2xl font-bold mt-3 mb-4">
								Location <i className="bx bxs-map text-red-700"></i>
							</h2>
							<MapComponent coordinates={coordinates} />
						</>
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
