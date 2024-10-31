import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Items from "./components/Items";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import NewItem from "./components/NewItem";
import EditItem from "./components/EditItem";
import ItemDetails from "./components/ItemDetails";
import SearchResults from "./components/SearchResults";
import ErrorBoundary from "./components/ErrorBoundary";
import SignIn from "./components/SignIn";
import AboutUs from "./components/AboutUs";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	return token ? children : <Navigate to="/login" />;
};

function App() {
	const [loading, setLoading] = useState(true);
	const [timeLeft, setTimeLeft] = useState(90); // Countdown timer

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("https://resold-mern.onrender.com/allproducts");
			if (response.ok) {
				// Handle your data here, e.g., set state
				setLoading(false);
			} else {
				// Handle error
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (loading) {
			const timer = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						window.location.reload(); // Refresh the page
						return 0; // Stop countdown
					}
					return prev - 1;
				});
			}, 1000);

			return () => clearInterval(timer); // Clean up on unmount
		}
	}, [loading]);

	return (
		<ErrorBoundary>
			<Router>
				<div className="flex flex-col min-h-screen h-full w-full">
					<Navbar />
					{loading && (
						<div className="loading-container">
							<p className="loading-text">
								Thanks for visiting. <br />
								It's a full-stack project, so we are running our backend on a public cloud.
								<br />
								Loading in {timeLeft} seconds or maybe less. <br />
								Thanks for your patience. Our website instance will run soon. <br />
								Website will refresh after timeout.
							</p>
						</div>
					)}
					<main className="flex-grow">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<SignIn />} />
							<Route path="/items" element={<Items />} />
							<Route path="/profile/:id" element={<Profile />} />
							<Route path="/edit-profile" element={<EditProfile />} />
							<Route
								path="/new-item"
								element={
									<ProtectedRoute>
										<NewItem />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/edit-item/:id"
								element={
									<ProtectedRoute>
										<EditItem />
									</ProtectedRoute>
								}
							/>
							<Route path="/items/:id" element={<ItemDetails />} />
							<Route path="/search" element={<SearchResults />} />
							<Route path="/about" element={<AboutUs />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
