import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";

function Profile() {
	const { id } = useParams();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/users/${id}`);
				setProfile(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchProfile();
	}, [id]);
	const handleDelete = async (id) => {
		const token = localStorage.getItem("token");
		await axios.delete(`http://localhost:5000/items/${id}`, {
			headers: {
				Authorization: token,
			},
		});
	};

	const handleEdit = (id) => {
		Navigate(`/edit-item/${id}`);
	};
	if (!profile) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold pb-3">User Profile</h1>
			<div className="flex justify-content">
				<div className="flex justify-evenly lg:w-auto mr-40 border border-black p-5 rounded-lg ">
					<div className="block mr-3">
						{profile.user.profileImage && (
							<img
								src={`http://localhost:5000/${profile.user.profileImage}`}
								alt="Profile"
								className="w-32 h-32 rounded-full mt-4"
							/>
						)}
					</div>
					<div>
						<h2 className="text-xl font-bold">{profile.user.username}</h2>
						<p>Contact: {profile.user.contact}</p>
						<p>Address: {profile.user.address}</p>
						<p>Email: {profile.user.email}</p>
						<Link
							to={`/edit-profile`}
							className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
						>
							Edit Profile
						</Link>
					</div>
				</div>
				<div className="flex justify-evenly lg:w-auto border border-black p-5 rounded-lg ">
					<div className="block mr-3">
						{profile.user.profileImage && (
							<img
								src={`http://localhost:5000/${profile.user.profileImage}`}
								alt="Profile"
								className="w-32 h-32 rounded-full mt-4"
							/>
						)}
					</div>
					<div>
						<h2 className="text-xl font-bold">{profile.user.username}</h2>
						<p>Contact: {profile.user.contact}</p>
						<p>Address: {profile.user.address}</p>
						<p>Email: {profile.user.email}</p>
						<Link
							to={`/edit-profile`}
							className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
						>
							Edit Profile
						</Link>
					</div>
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
								alt="Profile"
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
