import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ChartComponent from "./ChartComponent";

function Profile() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [profile, setProfile] = useState(null);
	const [likes, setLikes] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			//just random like logics
			const Likes = Math.floor(Math.random() * 10);
			setLikes(Likes);

			try {
				const response = await axios.get(`http://localhost:5000/users/${id}`);
				setProfile(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchProfile();
	}, [id]);

	const handleDelete = async (itemId) => {
		const token = localStorage.getItem("token");
		try {
			await axios.delete(`http://localhost:5000/items/${itemId}`, {
				headers: {
					Authorization: token,
				},
			});
			setProfile((prevProfile) => ({
				...prevProfile,
				items: prevProfile.items.filter((item) => item._id !== itemId),
			}));
		} catch (error) {
			console.error(error);
		}
	};

	const handleEdit = (itemId) => {
		navigate(`/edit-item/${itemId}`);
	};

	if (!profile) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-12 h-full mobile:p-4">
			<div className="flex justify-center items-center flex-col lg:flex-row">
				<div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
					<h3 className="text-center text-2xl  font-bold mb-4">Profile</h3>
					<div className="rounded-t-lg h-32 overflow-hidden">
						{profile.user.profileImage ? (
							<img
								className="object-cover object-top w-full"
								src={`http://localhost:5000/${profile.user.profileImage}`}
								alt="Mountain"
							/>
						) : (
							""
						)}
					</div>
					<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
						{profile.user.profileImage ? (
							<img
								className="object-cover object-center h-32"
								src={`http://localhost:5000/${profile.user.profileImage}`}
								alt="Woman looking front"
							/>
						) : (
							<img
								className="object-cover object-center h-32"
								src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image-337x279.png"
								alt="Default avatar"
							/>
						)}
					</div>
					<div className="text-center mt-2">
						<h2 className="text-xl font-semibold">{profile.user.username}</h2>
						<p className="text-gray-500">{profile.user.address}</p>
					</div>
					<p className="text-center text-gray-600 text-base pt-3 font-normal">
						Contact : {profile.user.contact} <br />
						Email : {profile.user.email}
					</p>

					<div className="p-4 border-t mx-8 mt-2">
						<Link to={`/edit-profile`}>
							<button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
								Edit
							</button>
						</Link>
					</div>
				</div>
				<div className="w-full p-6 flex flex-col items-center">
					<h3 className="text-center text-2xl font-bold mb-4">Summary</h3>

					<div className="w-full flex justify-center ">
						<ChartComponent items={profile.items} />
					</div>
				</div>
			</div>
			<div className="flex justify-evenly mt-10">
				<div className="border w-48  flex justify-center border-black p-2   rounded-lg ">
					<h2>
						<i className="bx bxs-message-dots text-4xl align-middle text-blue-500"></i> Total Adds :{" "}
						<span className="text-2xl text-red-400 align-middle ">{profile.items.length}</span>
					</h2>
				</div>
				<div className="border w-48 flex justify-center border-black p-2   rounded-lg ">
					<h2>
						<i className="bx bx-check-circle align-middle text-4xl text-green-400"></i> Total Sold :{" "}
						{profile.items.length - profile.items.length + 1}
					</h2>
				</div>
				<div className="border w-48 flex justify-center border-black p-2  rounded-lg ">
					<h2>
						<i className="bx bx-heart text-4xl align-middle mr-2 text-red-400"></i>Liked Items :{" "}
						<span>{likes}</span>
					</h2>
				</div>
			</div>
			<h3 className="text-lg font-bold mt-8">Your Adds</h3>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
				{profile.items.map((item) => (
					<div key={item._id} className="flex flex-col justify-between border p-4 rounded-lg">
						<div>
							<Link to={`/items/${item._id}`}>
								<h2 className="text-xl font-bold">{item.title}</h2>
							</Link>
							<p>{item.description}</p>
							<p className="text-blue-500">Price: ${item.price}</p>
						</div>
						<div>
							<img
								src={`http://localhost:5000/${item.images[0]}`}
								alt="Item"
								className="w-32 h-32 rounded-lg mt-4"
							/>
						</div>
						<div className="flex space-x-2 pt-4">
							<button
								onClick={() => handleEdit(item._id)}
								className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm"
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(item._id)}
								className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Profile;
