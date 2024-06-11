// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		images: [{ type: String }], // Changed to support multiple images
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
