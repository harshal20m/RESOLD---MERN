import React from "react";

const ContactSellerPopup = ({ user, onClose }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative transition-transform transform hover:scale-105">
				<button className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800" onClick={onClose}>
					&times;
				</button>
				<h2 className="text-3xl font-bold mb-4 text-gray-800">Seller Details</h2>
				<div className="flex items-center mb-4">
					<img
						src={user.profileImage}
						alt={`${user.username}'s profile`}
						className="h-16 w-16 rounded-full border-2 border-gray-200 shadow-md"
					/>
					<div className="ml-4">
						<p className="text-lg font-semibold text-gray-700">{user.username}</p>
						<p className="text-sm text-gray-600">{user.address}</p>
					</div>
				</div>
				<div className="text-black">
					<p className="mb-2">
						<span className="font-semibold text-gray-800">Contact:</span>{" "}
						<span className="text-gray-600">{user.contact}</span>
					</p>
					<p>
						<span className="font-semibold text-gray-800">Email:</span>{" "}
						<span className="text-gray-600">{user.email}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ContactSellerPopup;
