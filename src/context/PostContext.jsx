import { createContext, useState, useEffect, useContext } from "react";
import { initialArticles } from "../data/articles";

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  // Menggunakan fungsi inisializer untuk useState agar hanya dijalankan sekali
  const [posts, setPosts] = useState(() => {
    try {
      const storedPosts = localStorage.getItem("CodeCraftIndoPosts");
      return storedPosts ? JSON.parse(storedPosts) : initialArticles;
    } catch (error) {
      console.error(
        "Failed to load posts from localStorage, using initial articles.",
        error
      );
      return initialArticles;
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error(
        "Failed to load favorites from localStorage, starting empty.",
        error
      );
      return [];
    }
  });

  // Effect untuk menyimpan posts ke localStorage setiap kali 'posts' berubah
  useEffect(() => {
    try {
      localStorage.setItem("CodeCraftIndoPosts", JSON.stringify(posts));
      console.log("Posts saved to localStorage.");
    } catch (error) {
      console.error("Failed to save posts to localStorage:", error);
    }
  }, [posts]);

  // Effect untuk menyimpan favorites ke localStorage setiap kali 'favorites' berubah
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      console.log("Favorites saved to localStorage.");
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: `post-${Date.now()}`, // Menggunakan format string untuk ID agar konsisten
      date: new Date().toISOString().split("T")[0], // Mengambil tanggal dalam format YYYY-MM-DD
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    console.log("New post added:", newPost.title); // Logging penambahan post
  };

  const toggleFavorite = (postId) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.includes(postId)) {
        updatedFavorites = prevFavorites.filter((id) => id !== postId);
        console.log(`Removed post ${postId} from favorites.`); // Logging
      } else {
        updatedFavorites = [...prevFavorites, postId];
        console.log(`Added post ${postId} to favorites.`); // Logging
      }
      return updatedFavorites;
    });
    // localStorage update dipindahkan ke useEffect terpisah di atas
  };

  const getFavoritePosts = () => {
    return posts.filter((post) => favorites.includes(post.id));
  };

  const value = {
    posts,
    addPost,
    toggleFavorite,
    favorites,
    getFavoritePosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = () => {
  return useContext(PostContext);
};
