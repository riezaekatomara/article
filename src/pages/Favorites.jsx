import ArticleCard from "../components/ArticleCard";
import { usePosts } from "../context/PostContext";

const Favorites = () => {
  const { getFavoritePosts } = usePosts();
  const favoritePosts = getFavoritePosts();

  return (
    <div>
      {/* Perubahan pada styling judul */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 pb-4 border-b-4 border-blue-500 inline-block">
        My Favorite Articles
      </h1>
      {favoritePosts.length > 0 ? (
        <div className="grid gap-8">
          {favoritePosts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        // Perbaikan styling pesan kosong
        <div className="text-center bg-blue-50 p-8 rounded-lg shadow-inner mt-10">
          <p className="text-gray-700 text-2xl font-semibold mb-4">
            Oops! It looks like you haven't favorited any articles yet.
          </p>
          <p className="text-gray-600 text-lg">
            Click the ❤️ icon on an article to add it to your favorites!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
