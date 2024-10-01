import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategorySelector.css";

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
		<div className="relative overflow-hidden h-auto">
			<div
				ref={categoriesRef}
				className="category-container text-black flex overflow-x-auto whitespace-nowrap py-1 "
				style={{
					padding: "5px",
				}}
				onScroll={handleScroll}
			>
				{categories.map((category) => (
					<div
						key={category}
						onClick={() => handleCategoryClick(category)}
						className={`category-item px-4 py-2 mx-1 rounded-lg cursor-pointer text-center sm:text-sm text-xs ${
							selectedCategory === category ? "bg-gray-300" : "bg-gray-100"
						}`}
						style={{
							flexShrink: 0,
						}}
					>
						{category}
					</div>
				))}
			</div>
			{/* Left Arrow */}
			{showLeftArrow && (
				<div
					className="slider-arrow left text-black absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer"
					onClick={() => categoriesRef.current.scrollBy({ left: -300, behavior: "smooth" })}
				>
					<i className="bx bxs-left-arrow text-2xl"></i>
				</div>
			)}
			{/* Right Arrow */}
			{showRightArrow && (
				<div
					className="slider-arrow right text-black absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer"
					onClick={() => categoriesRef.current.scrollBy({ left: 300, behavior: "smooth" })}
				>
					<i className="bx bxs-right-arrow text-2xl"></i>
				</div>
			)}
		</div>
	);
};

export default CategorySelector;
