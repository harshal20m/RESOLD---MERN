import developerImage from "../assets/images/harshl.jpg";

const AboutUs = () => {
	return (
		<div className="bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white bg-purple-500">
			<div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
				<img
					src={developerImage}
					alt="Developer"
					className="w-64 h-64 rounded-full mb-4 border-4 border-purple-500"
				/>
				<h1 className="text-3xl font-bold mb-2">About Us</h1>
				<p className="text-gray-700 mb-6 text-center">
					Welcome to our resell platform! We are dedicated to providing a seamless and enjoyable experience
					for buying and selling pre-owned goods. Our mission is to promote sustainability by giving items a
					second life while connecting a community of passionate individuals.
				</p>
				<h2 className="text-2xl font-semibold mb-2">Meet the Developer</h2>
				<p className="text-gray-700 text-center mb-4">
					This platform is developed by Me i'm passionate individual who believes in the power of sustainable
					living. With a background in web development, I strive to create a user-friendly interface that
					makes reselling easy and accessible for everyone.
				</p>
				<div className="flex space-x-4">
					<a
						href="https://www.linkedin.com/in/harshal-mali-b40b61244/"
						className="text-blue-500 hover:underline"
					>
						LinkedIn
					</a>
					<a href="https://github.com/harshal20m" className="text-blue-500 hover:underline">
						GitHub
					</a>
					<a href="https://www.instagram.com/20harshal/" className="text-blue-500 hover:underline">
						Instagram
					</a>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
