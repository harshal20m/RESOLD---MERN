import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Items from "./components/Items";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import NewItem from "./components/NewItem";
import EditItem from "./components/EditItem";
import ItemDetails from "./components/ItemDetails";
import SearchResults from "./components/SearchResults";

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	return token ? children : <Navigate to="/login" />;
};

function App() {
	return (
		<Router>
			<div className="flex flex-col dark:bg-gray-700 min-h-screen">
				<Navbar />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
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
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
