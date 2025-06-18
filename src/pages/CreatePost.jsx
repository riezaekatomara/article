import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const { currentUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    addPost({
      title,
      // Tetap gunakan konversi sederhana ini untuk saat ini
      // Mengintegrasikan editor markdown/rich text akan memerlukan perubahan signifikan di sini
      content: `<p>${content.replace(/\n/g, "</p><p>")}</p>`,
      tags: tags.split(",").map((tag) => tag.trim()),
      author: currentUser.name,
      authorId: currentUser.id,
    });

    navigate("/");
  };

  return (
    // Penambahan styling pada container form
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-lg shadow-xl border border-gray-100">
      {/* Perubahan pada styling judul */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 pb-4 border-b-4 border-blue-500 inline-block">
        Create New Article
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-xl font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Your captivating article title"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-xl font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="15"
            className="w-full p-4 border border-gray-300 rounded-lg text-lg font-serif focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Write your insightful story..."
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="tags"
            className="block text-xl font-medium text-gray-700 mb-2"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., react, javascript, webdev (comma separated)"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Publish Article
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
