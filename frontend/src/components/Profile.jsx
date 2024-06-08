// src/components/Profile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
	const { id } = useParams();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/users/${id}`)
			.then((response) => setProfile(response.data))
			.catch((error) => console.error(error));
	}, [id]);

	if (!profile) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">User Profile</h1>
			<h2 className="text-xl font-bold">{profile.user.username}</h2>
			<h3 className="text-lg font-bold mt-4">Items for Sale</h3>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
				{profile.items.map((item) => (
					<div key={item._id} className="border p-4">
						<h2 className="text-xl font-bold">{item.title}</h2>
						<p>{item.description}</p>
						<p className="text-blue-500">Price: ${item.price}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Profile;
