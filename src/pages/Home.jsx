import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ArticleCard from "../components/ArticleCard";
import { usePosts } from "../context/PostContext";

const Home = () => {
  const { posts } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [searchFocus, setSearchFocus] = useState(false);
  const heroRef = useRef(null);
  const articlesRef = useRef(null);

  // Memoize expensive calculations
  const allTags = useMemo(
    () => ["all", ...new Set(posts.flatMap((post) => post.tags))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          post.author.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (selectedTag !== "all") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    // Sort posts
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });
  }, [posts, searchTerm, selectedTag, sortBy]);

  // Optimize loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Debounced search handlers
  const handleSearchKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && searchTerm.trim()) {
        e.preventDefault();
        articlesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        e.target.blur();
      }
    },
    [searchTerm]
  );

  const handleSearchClick = useCallback(() => {
    if (searchTerm.trim()) {
      articlesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchTerm]);

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedTag("all");
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Stats calculation
  const stats = useMemo(
    () => [
      {
        value: posts.length,
        label: "Articles",
        color: "from-yellow-400 to-orange-400",
        icon: "📚",
      },
      {
        value: allTags.length - 1,
        label: "Topics",
        color: "from-green-400 to-blue-400",
        icon: "🏷️",
      },
      {
        value: new Set(posts.map((p) => p.author)).size,
        label: "Authors",
        color: "from-purple-400 to-pink-400",
        icon: "✍️",
      },
      {
        value: filteredPosts.length,
        label: "Filtered",
        color: "from-blue-400 to-indigo-400",
        icon: "🔍",
      },
    ],
    [posts, allTags.length, filteredPosts.length]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative">
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin animate-reverse"></div>
          <div className="absolute inset-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full animate-bounce"></div>
          </div>
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold animate-pulse">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white"
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="inline-block animate-fade-in-up bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="inline-block animate-fade-in-up bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent opacity-0 animate-delay-200">
                Amazing
              </span>
              <br />
              <span className="inline-block animate-fade-in-up bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent opacity-0 animate-delay-400">
                Stories
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto animate-fade-in-up opacity-0 animate-delay-600 leading-relaxed px-4">
              Dive into a world of brilliant insights, creative thoughts, and
              inspiring stories
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-fade-in-up opacity-0 animate-delay-800 px-4">
              <div
                className={`relative transition-all duration-300 ${
                  searchFocus ? "scale-105" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles, authors, tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    className="w-full pl-12 pr-16 py-4 text-base rounded-2xl border-0 bg-white/95 backdrop-blur-md shadow-xl focus:outline-none focus:ring-2 focus:ring-white/30 text-gray-800 placeholder-gray-500 transition-all duration-300"
                  />
                  {searchTerm && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <button
                        onClick={handleSearchClick}
                        className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      >
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 flex items-center justify-center"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12 animate-fade-in-up opacity-0 animate-delay-1000">
              {stats.map((stat, index) => (
                <div key={stat.label} className="group">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-slate-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div
        ref={articlesRef}
        className="bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            {/* View Mode Toggle & Sort Dropdown */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200"
              >
                <option value="newest">🕐 Newest</option>
                <option value="oldest">⏰ Oldest</option>
                <option value="title">🔤 Title</option>
                <option value="author">👤 Author</option>
              </select>
            </div>

            {/* Results Counter */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {filteredPosts.length} Results
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {tag === "all" ? "🌟 All" : `#${tag}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
              <div className="text-4xl">🔍</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Articles Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm
                ? `No articles found matching "${searchTerm}"`
                : "Try adjusting your filters"}
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                : "space-y-6"
            }
          >
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-fade-in-up opacity-0"
                style={{
                  animationDelay: `${Math.min(index * 0.1, 1)}s`,
                  animationFillMode: "forwards",
                }}
              >
                <ArticleCard post={post} viewMode={viewMode} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
        .animate-delay-400 {
          animation-delay: 0.4s;
        }
        .animate-delay-600 {
          animation-delay: 0.6s;
        }
        .animate-delay-800 {
          animation-delay: 0.8s;
        }
        .animate-delay-1000 {
          animation-delay: 1s;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

export default Home;
