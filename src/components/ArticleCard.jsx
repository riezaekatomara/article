import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePosts } from "../context/PostContext";

const ArticleCard = ({ post, index = 0, viewMode = "grid" }) => {
  const { toggleFavorite, favorites } = usePosts();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // Check if post is favorited
  const isFavorited = favorites.includes(post.id);

  // Initialize bookmark state from favorites
  useEffect(() => {
    setIsBookmarked(isFavorited);
  }, [isFavorited]);

  // Intersection Observer for smooth entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  // Simulate reading progress on hover
  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setReadProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 2;
        });
      }, 50);
    } else {
      setReadProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered]);

  // Ambil beberapa kalimat pertama untuk preview (SUDAH DIPERBAIKI)
  const previewContent =
    (post.content || "").replace(/<[^>]+>/g, "").substring(0, 150) + "...";

  // Enhanced gradient backgrounds dengan lebih banyak variasi
  const gradientVariants = [
    {
      bg: "from-blue-50 via-indigo-50 to-purple-50",
      border: "from-blue-400 via-indigo-400 to-purple-400",
      accent: "from-blue-500 to-indigo-500",
    },
    {
      bg: "from-purple-50 via-pink-50 to-rose-50",
      border: "from-purple-400 via-pink-400 to-rose-400",
      accent: "from-purple-500 to-pink-500",
    },
    {
      bg: "from-emerald-50 via-teal-50 to-cyan-50",
      border: "from-emerald-400 via-teal-400 to-cyan-400",
      accent: "from-emerald-500 to-teal-500",
    },
    {
      bg: "from-orange-50 via-amber-50 to-yellow-50",
      border: "from-orange-400 via-amber-400 to-yellow-400",
      accent: "from-orange-500 to-amber-500",
    },
    {
      bg: "from-rose-50 via-pink-50 to-fuchsia-50",
      border: "from-rose-400 via-pink-400 to-fuchsia-400",
      accent: "from-rose-500 to-pink-500",
    },
  ];

  const selectedVariant = gradientVariants[index % gradientVariants.length];

  // Enhanced reading time calculation (SUDAH DIPERBAIKI)
  const readingTime = Math.max(
    1,
    Math.ceil(
      (post.content || "").replace(/<[^>]+>/g, "").split(" ").length / 200
    )
  );

  // Enhanced tag colors
  const tagColors = [
    "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:scale-105",
    "bg-purple-100 text-purple-800 hover:bg-purple-200 hover:scale-105",
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:scale-105",
    "bg-rose-100 text-rose-800 hover:bg-rose-200 hover:scale-105",
    "bg-amber-100 text-amber-800 hover:bg-amber-200 hover:scale-105",
  ];

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(post.id);
    setIsBookmarked(!isBookmarked);
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  if (viewMode === "list") {
    return (
      <Link to={`/article?id=${post.id}`}>
        <article
          className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 cursor-pointer ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDelay: `${index * 0.1}s`,
          }}
        >
          {/* Animated gradient border */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${selectedVariant.border} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
          ></div>

          <div className="relative p-6 flex gap-6">
            {/* Content */}
            <div className="flex-1">
              {/* Author info */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedVariant.accent} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                      {post.author}
                    </span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="text-blue-600">
                      {readingTime} min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold mb-3 text-gray-900 leading-tight">
                <span
                  className={`bg-gradient-to-r ${selectedVariant.accent} bg-clip-text text-transparent hover:from-gray-900 hover:to-gray-700 transition-all duration-300`}
                >
                  {post.title}
                </span>
              </h2>

              {/* Preview */}
              <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                {previewContent}
              </p>

              {/* Tags (SUDAH DIPERBAIKI) */}
              <div className="flex flex-wrap gap-2">
                {Array.isArray(post.tags) &&
                  post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        tagColors[tagIndex % tagColors.length]
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleLikeClick}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isLiked
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              <button
                onClick={handleBookmarkClick}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isBookmarked
                    ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-500"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={isBookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${selectedVariant.accent} transition-all duration-300 ease-out`}
              style={{ width: `${readProgress}%` }}
            ></div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/article?id=${post.id}`}>
      <article
        className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${
          selectedVariant.bg
        } p-1 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDelay: `${index * 0.1}s`,
        }}
      >
        {/* Enhanced animated border gradient */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${selectedVariant.border} opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm`}
        ></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Main content container */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 h-full shadow-lg">
          {/* Enhanced floating action buttons */}
          <div
            className={`absolute top-6 right-6 flex gap-3 transition-all duration-500 ${
              isHovered
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-95"
            }`}
          >
            <button
              onClick={handleLikeClick}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-125 hover:rotate-12 ${
                isLiked
                  ? "bg-red-500 text-white shadow-xl shadow-red-500/40 animate-pulse"
                  : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 shadow-lg hover:shadow-xl"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button
              onClick={handleBookmarkClick}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-125 hover:rotate-12 ${
                isBookmarked
                  ? "bg-yellow-500 text-white shadow-xl shadow-yellow-500/40 animate-pulse"
                  : "bg-white/90 text-gray-600 hover:bg-yellow-50 hover:text-yellow-500 shadow-lg hover:shadow-xl"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>

          {/* Enhanced header with author info */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-full bg-gradient-to-br ${selectedVariant.accent} flex items-center justify-center text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110`}
            >
              {post.author.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="text-gray-800 font-bold text-base">
                  {post.author}
                </span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                <time
                  dateTime={post.date}
                  className="hover:text-gray-800 transition-colors duration-200"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                <span
                  className={`text-transparent bg-gradient-to-r ${selectedVariant.accent} bg-clip-text font-semibold`}
                >
                  {readingTime} min read
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced title with better typography */}
          <h2 className="text-2xl md:text-3xl font-black mb-5 text-gray-900 leading-tight">
            <span
              className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent hover:bg-gradient-to-r hover:${selectedVariant.accent} hover:bg-clip-text transition-all duration-500 group-hover:scale-[1.02] inline-block`}
            >
              {post.title}
            </span>
          </h2>

          {/* Enhanced preview content */}
          <p className="text-gray-700 leading-relaxed mb-6 text-lg line-clamp-3 hover:text-gray-900 transition-colors duration-300">
            {previewContent}
          </p>

          {/* Enhanced tags with better styling (SUDAH DIPERBAIKI) */}
          <div className="flex flex-wrap gap-3 mb-6">
            {Array.isArray(post.tags) &&
              post.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tag}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 hover:scale-110 cursor-pointer ${
                    tagColors[tagIndex % tagColors.length]
                  }`}
                  style={{
                    animationDelay: `${tagIndex * 0.1}s`,
                  }}
                >
                  #{tag}
                </span>
              ))}
            {Array.isArray(post.tags) && post.tags.length > 3 && (
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 hover:scale-110 cursor-pointer">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Enhanced CTA section */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2 hover:text-gray-700 transition-colors duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="font-medium">1.2k views</span>
              </div>
              <div className="flex items-center gap-2 hover:text-gray-700 transition-colors duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-medium">24 comments</span>
              </div>
            </div>

            <div
              className={`group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${selectedVariant.accent} hover:shadow-xl text-white font-bold rounded-full transition-all duration-300 hover:scale-105 transform hover:-translate-y-1`}
            >
              <span>Read Article</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </div>

          {/* Enhanced progress indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-100 rounded-b-3xl overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${selectedVariant.accent} transition-all duration-1000 ease-out`}
              style={{ width: `${readProgress}%` }}
            ></div>
          </div>

          {/* Floating particles effect */}
          {isHovered && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-15px) scale(1.2);
              opacity: 1;
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </article>
    </Link>
  );
};

export default ArticleCard;
