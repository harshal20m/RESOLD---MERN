// Pagination.js

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	return (
		<div className="flex justify-center items-center py-4  ">
			<button
				onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
				className="px-2 py-0.5 mx-0.5 text-2xl"
				disabled={currentPage === 1}
			>
				<i className="bx bx-chevrons-left bx-fade-left"></i>
			</button>
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index}
					onClick={() => onPageChange(index + 1)}
					className={`px-2 py-0.5 mx-0.5 text-xs rounded-full ${
						currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
					}`}
				>
					<p className="text-black">{index + 1}</p>
				</button>
			))}
			<button
				onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
				className="px-2 py-0.5 mx-0.5 text-2xl"
				disabled={currentPage === totalPages}
			>
				<i className="bx bx-chevrons-right bx-fade-right"></i>
			</button>
		</div>
	);
};

export default Pagination;
