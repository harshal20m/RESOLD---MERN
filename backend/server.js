// server.js
if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

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

//map box
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const Chat = require("./models/Chat");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

let dbURL = process.env.MONGO_DB_URI;
main()
	.then(() => {
		console.log("connected to DB.");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(dbURL);
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage });

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
		const token = jwt.sign({ username, id: user._id }, "secret_key", { expiresIn: "24h" });
		const { _id } = user;

		res.json({ token, _id });
	} else {
		res.status(401).send("Invalid credentials");
	}
});
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader; // Extract token after 'Bearer '
	if (token == null) return res.sendStatus(401); // No token provided

	jwt.verify(token, "secret_key", (err, user) => {
		if (err) {
			if (err.name === "TokenExpiredError") {
				return res.status(403).send("Token has expired"); // Token expired
			}
			return res.sendStatus(403); // Invalid token
		}
		req.user = user; // Attach user to request
		next();
	});
};

app.post("/items", authenticateToken, upload.array("images", 10), async (req, res) => {
	try {
		// Get the user information
		const user = await User.findById(req.user.id);

		// Extract the address and get the first word for city and state
		const addressParts = user.address.match(/\b\w+\b/g);
		const city = addressParts[0];
		const state = addressParts[1];

		// Get the geolocation data
		const geoResponse = await geocodingClient
			.forwardGeocode({
				query: `${city},${state}`,
				limit: 1,
			})
			.send();

		// Extract data from the request
		const { title, description, price, status, category } = req.body;

		// Get paths of the uploaded images
		const images = req.files.map((file) => file.path);

		// Create a new item with the provided data
		const newItem = new Item({
			title,
			description,
			price,
			images,
			user: req.user.id,
			status,
			category,
		});

		// Assign geolocation data to the item
		newItem.geometry = geoResponse.body.features[0].geometry;

		// Save the new item to the database
		await newItem.save();

		console.log(newItem);
		res.status(201).send("Item created successfully");
	} catch (error) {
		console.error("Error creating item:", error);
		res.status(500).json({ error: "Server error. Please try again later." });
	}
});
//search functionality
// server.js
app.get("/items", async (req, res) => {
	const { page = 1, limit = 10, search = "" } = req.query;

	try {
		const query = search
			? {
					$or: [
						{ category: { $regex: search, $options: "i" } },
						{ title: { $regex: search, $options: "i" } },
					],
			  }
			: {};

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
app.put("/users/:id", authenticateToken, upload.single("profileImage"), async (req, res) => {
	console.log("working route edit user");
	const { username, contact, password, address, email, profileImage } = req.body;

	try {
		// Check if the user exists
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		console.log(user);

		// Validate input fields
		if (!username && !contact && !password && !address && !email && !profileImage) {
			return res.status(400).json({ error: "No fields provided for update" });
		}

		// Update user data
		if (username) user.username = username;
		if (contact) user.contact = contact;
		if (password) {
			// Hash the new password
			const hashedPassword = await bcrypt.hash(password, 10);
			user.password = hashedPassword;
		}
		// Similarly, validate and update other fields like address, email, profileImage, etc.
		if (address) user.address = address;
		if (email) user.email = email;
		if (req.file) user.profileImage = req.file.path; // Save the filename in the database
		// Save the updated user
		await user.save();
		console.log(user);

		// Send a success response
		return res.status(200).json({ message: "User updated successfully" });
	} catch (error) {
		// Log the error
		console.error("Error updating user:", error);
		// Send an error response
		return res.status(500).json({ error: "Server error. Please try again later." });
	}
});

app.get("/items/:id", async (req, res) => {
	const items = await Item.findById(req.params.id);

	const userid = await User.findById(items.user);

	res.json({ userid, items });
});

app.put("/items/:id", authenticateToken, upload.array("images", 10), async (req, res) => {
	const { title, description, price, status } = req.body;
	const item = await Item.findById(req.params.id);
	if (!item) return res.status(404).send("Item not found");
	if (item.user.toString() !== req.user.id) return res.sendStatus(403);

	item.title = title;
	item.description = description;
	item.price = price;
	item.status = status;

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
