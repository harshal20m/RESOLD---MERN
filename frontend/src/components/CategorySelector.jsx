import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
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
];

const CategorySelector = () => {
	const [selectedCategory, setSelectedCategory] = useState("");
	const navigate = useNavigate();
	const categoriesRef = useRef(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);
	const [searchQuery, setSearchQuery] = useState(""); // Assuming this state exists

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
		navigate(`/search?query=${category}`); // Using the category as the query
	};

	const handleScroll = () => {
		const container = categoriesRef.current;
		setShowLeftArrow(container.scrollLeft > 0);
		setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
	};

	useEffect(() => {
		handleScroll(); // Initial check
	}, []);

	return (
		<div style={{ position: "relative", overflow: "hidden", height: "auto" }}>
			<div
				ref={categoriesRef}
				className="category-container text-black"
				style={{
					display: "flex",
					overflowX: "auto",
					whiteSpace: "nowrap",
					padding: "5px",
					marginBottom: "-10px",
					height: "auto",
					scrollbarWidth: "none", // Firefox
					msOverflowStyle: "none", // Edge
					"&::-webkit-scrollbar": {
						display: "none", // Chrome, Safari, Opera
					},
				}}
				onScroll={handleScroll}
			>
				{categories.map((category) => (
					<div
						key={category}
						onClick={() => handleCategoryClick(category)}
						style={{
							padding: "10px 20px",
							margin: "5px",
							cursor: "pointer",
							backgroundColor: selectedCategory === category ? "#d3d3d3" : "#f0f0f0",
							borderRadius: "5px",
							flexShrink: 0,
						}}
					>
						{category}
					</div>
				))}
			</div>
			{showLeftArrow && (
				<div
					className="slider-arrow left text-black"
					onClick={() => categoriesRef.current.scrollBy(-300, 0)}
					style={{
						position: "absolute",
						top: "50%",
						left: "10px",
						transform: "translateY(-50%)",
						zIndex: "1",
						cursor: "pointer",
					}}
				>
					<i className="bx bxs-left-arrow text-2xl size-bold"></i>
				</div>
			)}
			{showRightArrow && (
				<div
					className="slider-arrow right text-black"
					onClick={() => categoriesRef.current.scrollBy(300, 0)}
					style={{
						position: "absolute",
						top: "50%",
						right: "10px",
						transform: "translateY(-50%)",
						zIndex: "1",
						cursor: "pointer",
					}}
				>
					<i className="bx bxs-right-arrow text-2xl text-black size-bold"></i>
				</div>
			)}
		</div>
	);
};

export default CategorySelector;
