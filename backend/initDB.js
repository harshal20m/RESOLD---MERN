// initDB.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Item = require("./models/Item");

mongoose
	.connect("mongodb://localhost:27017/olx-clone")
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log("Error connecting to database:", err);
	});

const createSampleData = async () => {
	await User.deleteMany({});
	await Item.deleteMany({});

	const hashedPassword = await bcrypt.hash("password", 10);
	const user = new User({ username: "sampleuser", password: hashedPassword });
	await user.save();

	const items = [
		{ title: "Item 1", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 2", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 3", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 4", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 5", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 6", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 7", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 8", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 9", description: "Description for Item 2", price: 200, user: user._id },
		{ title: "Item 1", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 2", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 3", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 4", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 5", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 6", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 7", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 8", description: "Description for Item 1", price: 100, user: user._id },
		{ title: "Item 9", description: "Description for Item 2", price: 200, user: user._id },
	];

	await Item.insertMany(items);
	console.log("Sample data created");
};

createSampleData()
	.then(() => {
		mongoose.disconnect();
	})
	.catch((err) => {
		console.error("Error creating sample data:", err);
	});
