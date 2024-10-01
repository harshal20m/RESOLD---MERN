const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		// Updated to store Cloudinary image details
		images: [
			{
				url: { type: String, required: true }, // URL of the image
				public_id: { type: String, required: true }, // Cloudinary public ID for easy management (e.g., deletion)
			},
		],
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		geometry: {
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
		status: {
			type: String,
			enum: ["available", "unavailable"],
			default: "available",
		},
		category: {
			type: String,
			enum: [
				"Electronics",
				"Home Appliances",
				"Fitness",
				"Gadgets",
				"Clothing & Accessories",
				"Toys & Games",
				"Kitchen & Dining",
				"Office Supplies",
				"Outdoor & Garden",
				"Sports & Recreation",
				"Books & Media",
				"Furniture",
			],
			required: true,
		},
	},
	{
		timestamps: true, // This will add `createdAt` and `updatedAt` fields
	}
);

module.exports = mongoose.model("Item", itemSchema);
