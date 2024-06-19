// models/Chat.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
	itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
	buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	messages: [
		{
			sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
			content: { type: String, required: true },
			timestamp: { type: Date, default: Date.now },
		},
	],
});

module.exports = mongoose.model("Chat", chatSchema);
