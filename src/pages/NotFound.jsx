import { Link } from "react-router-dom";
import { Frown } from "lucide-react"; // Menambahkan ikon untuk visual

const NotFound = () => {
  return (
    // Menambahkan styling untuk centering dan visual yang lebih baik
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-2xl mx-auto my-10 border border-gray-200">
      <Frown size={80} className="text-blue-500 mb-6" /> {/* Ikon */}
      <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-gray-900 mb-4 tracking-tight">
        404
      </h1>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        Page Not Found!
      </p>
      <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-prose">
        Oops! It seems you've stumbled upon a page that doesn't exist. Don't
        worry, it happens to the best of us.
      </p>
      <Link
        to="/"
        className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go Back Home
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default NotFound;
