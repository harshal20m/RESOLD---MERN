const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
	itemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Item",
		required: true,
	},
	buyer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	senderName: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Chat", chatSchema);
