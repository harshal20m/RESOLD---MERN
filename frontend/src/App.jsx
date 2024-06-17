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

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	return token ? children : <Navigate to="/login" />;
};

function App() {
	return (
		<ErrorBoundary>
			<Router>
				<div className="flex flex-col min-h-screen h-full w-full">
					<Navbar />
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
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
