import React from "react";
const Loading = ({ show }) => {
	return (
		show && (
			<div>
				<div className="flex items-center justify-center h-screen ">
					<span className="animate-wave-1 font-bold text-6xl text-white">R</span>
					<span className="animate-wave-2 font-bold text-6xl text-white">E</span>
					<span className="animate-wave-3 font-bold text-6xl text-white">S</span>
					<span className="animate-wave-4 font-bold text-6xl text-red-600">
						{/* <i className="bx bx-loader-alt bx-spin bx-rotate-90 block"></i> */}
						<i className="bx bx-loader-circle bx-spin bx-rotate-90"></i>
					</span>
					<span className="animate-wave-5 font-bold text-6xl text-red-600">L</span>
					<span className="animate-wave-6 font-bold text-6xl text-red-600">D</span>
				</div>
			</div>
		)
	);
};

export default Loading;
