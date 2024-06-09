// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");
const Item = require("./models/Item");
const Chat = require("./models/Chat");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect("mongodb://localhost:27017/olx-clone");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage });

// app.post("/register", async (req, res) => {
// 	const { username, contact, address, email, password } = req.body;
// 	const hashedPassword = await bcrypt.hash(password, 10);
// 	const newUser = new User({ username, contact, address, email, password: hashedPassword });
// 	await newUser.save();
// 	res.status(201).send("User registered");
// });

// Use multer middleware to handle file uploads
app.post("/register", upload.single("profileImage"), async (req, res) => {
	const { username, contact, address, email, password } = req.body;
	const profileImage = req.file ? req.file.path : ""; // Get the path of the uploaded file if exists
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new User({ username, contact, address, email, password: hashedPassword, profileImage });
	await newUser.save();
	res.status(201).send("User registered");
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (user && (await bcrypt.compare(password, user.password))) {
		const token = jwt.sign({ username, id: user._id }, "secret_key", { expiresIn: "1h" });
		const { _id } = user;
		console.log(_id);
		res.json({ token, _id });
	} else {
		res.status(401).send("Invalid credentials");
	}
});

const authenticateToken = (req, res, next) => {
	const token = req.headers["authorization"];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, "secret_key", (err, user) => {
		console.log(token);
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

app.post("/items", authenticateToken, upload.array("images", 5), async (req, res) => {
	// Updated to handle multiple images
	const { title, description, price } = req.body;
	const images = req.files.map((file) => file.path);
	const newItem = new Item({ title, description, price, images, user: req.user.id });
	await newItem.save();
	res.status(201).send("Item created");
});

// app.get("/items", async (req, res) => {
// 	const { page = 1, limit = 10 } = req.query;

// 	try {
// 		const items = await Item.find()
// 			.populate("user", "username")
// 			.limit(limit * 1)
// 			.skip((page - 1) * limit)
// 			.exec();

// 		const count = await Item.countDocuments();

// 		res.json({
// 			items,
// 			totalPages: Math.ceil(count / limit),
// 			currentPage: Number(page),
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });

//search functionality
// server.js
app.get("/items", async (req, res) => {
	const { page = 1, limit = 10, search = "" } = req.query;

	try {
		const query = search ? { title: { $regex: search, $options: "i" } } : {};
		const items = await Item.find(query)
			.populate("user", "username")
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const count = await Item.countDocuments(query);

		res.json({
			items,
			totalPages: Math.ceil(count / limit),
			currentPage: Number(page),
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get("/users/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	const items = await Item.find({ user: req.params.id });
	res.json({ user, items });
});

// server.js new add profile editing
app.put("/users/:id", authenticateToken, async (req, res) => {
	const { username, contact, password } = req.body;
	try {
		const user = await User.findById(req.params.id);
		console.log(user);
		if (!user) return res.status(404).send("User not found");

		user.username = username;
		user.contact = contact;
		if (password) {
			user.password = await bcrypt.hash(password, 10);
		}
		await user.save();
		res.send("User updated");
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});
app.get("/items/:id", async (req, res) => {
	const items = await Item.findById(req.params.id);

	const userid = await User.findById(items.user);

	res.json({ userid, items });
});

app.put("/items/:id", authenticateToken, upload.array("images", 5), async (req, res) => {
	const { title, description, price } = req.body;
	const item = await Item.findById(req.params.id);
	if (!item) return res.status(404).send("Item not found");
	if (item.user.toString() !== req.user.id) return res.sendStatus(403);

	item.title = title;
	item.description = description;
	item.price = price;
	if (req.files.length > 0) {
		const images = req.files.map((file) => file.path);
		item.images = images; // Replace existing images with new images
	}
	await item.save();
	res.send("Item updated");
});

// server.js
app.put("/items/:id/add-images", authenticateToken, upload.array("images", 5), async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		if (!item) return res.status(404).send("Item not found");
		if (item.user.toString() !== req.user.id) return res.sendStatus(403);

		const images = req.files.map((file) => file.path);
		item.images.push(...images);
		await item.save();
		res.send("Images added");
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});

app.delete("/items/:id", authenticateToken, async (req, res) => {
	const item = await Item.findById(req.params.id);
	if (item.user.toString() !== req.user.id) return res.sendStatus(403);

	await Item.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of item.remove
	res.send("Item deleted");
});

//chat functionality here

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
