// import CategorySelector from "./CategorySelector";
// import Items from "./Items";

// function Home() {
// 	return (
// 		<div className=" ">
// 			<CategorySelector />
// 			<Items />
// 		</div>
// 	);
// }

// export default Home;

import { useRef, useState } from "react";
import CategorySelector from "./CategorySelector";
import Items from "./Items";
import Hero from "./Hero";

function Home() {
	const [searchQuery, setSearchQuery] = useState("");

	const handleCategoryClick = (category) => {
		setSearchQuery(category);
	};
	const itemsRef = useRef(null);

	const scrollToItems = () => {
		if (itemsRef.current) {
			itemsRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="bg-gradient-180 h-full w-full">
			<CategorySelector handleCategoryClick={handleCategoryClick} />
			<Hero scrollToItems={scrollToItems} />
			<div ref={itemsRef}>
				<Items searchQuery={searchQuery} />
			</div>
		</div>
	);
}

export default Home;
