// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	images: [{ type: String }], // Changed to support multiple images
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Item", itemSchema);
