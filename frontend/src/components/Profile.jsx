import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api";
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
				const response = await axiosInstance.get(`/users/${id}`);
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
			await axiosInstance.delete(`/items/${itemId}`, {
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
		<div className=" bg-gradient-180 w-full mx-auto p-12 h-full mobile:p-4">
			<div className="container mx-auto flex justify-between items-center flex-col lg:flex-row">
				<div className="bg-gradient-180 max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  shadow-xl rounded-lg text-gray-900">
					<h3 className="text-center text-2xl  font-bold mb-4">Profile</h3>
					<div className="rounded-t-lg h-32 overflow-hidden">
						{profile.user.profileImage ? (
							<img
								className="object-cover object-top w-full"
								src={profile.user.profileImage}
								alt="Mountain"
							/>
						) : (
							""
						)}
					</div>
					<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
						{profile.user.profileImage ? (
							<img
								className="object-cover object-center h-auto"
								src={profile.user.profileImage}
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
						<p className="text-white">{profile.user.address}</p>
					</div>
					<p className="text-center text-white text-base pt-3 font-normal">
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
					<h3 className="text-center text-black text-2xl font-bold ">Summary</h3>

					<div className="w-full flex justify-center ">
						<ChartComponent items={profile.items} />
					</div>
				</div>
			</div>
			<div className="flex justify-evenly mt-10  text-black">
				<div className="border w-48  flex justify-center border-slate-400 bg-gradient-150 p-2 rounded-lg ">
					<h2 className="group">
						<i className="bx bxs-message-dots text-4xl align-middle text-blue-900 bx-tada-hover"></i> Total
						Adds : <span className="text-2xl  align-middle ">{profile.items.length}</span>
					</h2>
				</div>
				<div className="border w-48 ml-3 flex justify-center    border-slate-400 bg-gradient-150 p-2 rounded-lg ">
					<h2>
						<i className="bx bxs-check-circle align-middle text-4xl text-green-600 bx-tada-hover "></i>{" "}
						Total Sold :{" "}
						<span className="text-2xl  ">{profile.items.length - profile.items.length + 1}</span>
					</h2>
				</div>
				<div className="border w-48 ml-3 flex justify-center   p-2  border-slate-400 bg-gradient-150 rounded-lg ">
					<h2>
						<i className="bx bxs-heart text-4xl align-middle mr-2 text-red-700 bx-tada-hover"></i>Liked
						Items : <span className=" text-2xl"> {likes}</span>
					</h2>
				</div>
			</div>
			<h3 className="text-2xl text-black text-center font-bold mt-8">Your Adds</h3>
			<div className="grid mx-auto grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4 text-black">
				{profile.items.map((item) => (
					<div
						key={item._id}
						className="bg-gradient-150 mx-auto w-72 flex flex-col justify-between border p-4 gap-3 rounded-lg"
					>
						<div>
							<Link to={`/items/${item._id}`}>
								<h2 className="text-xl font-bold">{item.title}</h2>
							</Link>
							<p>{item.description}</p>
							<p className="text-blue-500">Price: ₹ {item.price}</p>
						</div>
						<div>
							<img src={item.images[0].url} alt="Item" className="w-32 h-32 rounded-lg mt-4" />
						</div>
						<div className="flex space-x-2 pt-4">
							<button
								onClick={() => handleEdit(item._id)}
								className="bg-yellow-500 text-white px-3 py-2   text-sm rounded-xl"
							>
								Edit
							</button>
							<button
								className="bg-red-500 px-3 py-2 rounded-xl text-sm text-white"
								onClick={() => document.getElementById("my_modal_5").showModal()}
							>
								Delete
							</button>
							<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
								<div className="modal-box bg-red-500 text-white">
									<h3 className="font-bold text-lg">Delete</h3>
									<p className="py-4">
										Are you sure to delete current item. Changes will not be revert !
									</p>
									<div className="modal-action">
										<form method="dialog">
											{/* if there is a button in form, it will close the modal */}
											<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
												✕
											</button>
											<button
												className="btn hover:bg-red-800 hover:text-white"
												onClick={() => handleDelete(item._id)}
											>
												Delete
											</button>
										</form>
									</div>
								</div>
							</dialog>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Profile;
