import { useSearchParams, Link, Navigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import {
  Heart,
  UserCircle,
  Calendar,
  MessageCircle,
  Send,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Style yang lebih modern

const ArticleDetail = () => {
  const [searchParams] = useSearchParams();
  const { posts, toggleFavorite, favorites, getPostById } = usePosts(); // Asumsi getPostById ada
  const { currentUser } = useAuth();

  const articleId = searchParams.get("id");
  const article = posts.find((p) => p.id === articleId);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efek untuk scroll ke atas saat artikel berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [articleId]);

  // Efek untuk memuat komentar dari localStorage
  useEffect(() => {
    if (articleId) {
      try {
        const storedComments = localStorage.getItem(`comments_${articleId}`);
        setComments(storedComments ? JSON.parse(storedComments) : []);
      } catch (error) {
        console.error("Gagal memuat komentar dari localStorage:", error);
        setComments([]);
      }
    }
  }, [articleId]);

  // Efek untuk menyimpan komentar ke localStorage
  useEffect(() => {
    if (articleId) {
      localStorage.setItem(`comments_${articleId}`, JSON.stringify(comments));
    }
  }, [comments, articleId]);

  // Efek untuk syntax highlighting pada blok kode
  useEffect(() => {
    if (article) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [article]);

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const isFavorited = favorites.includes(article.id);

  const handleFavoriteClick = () => {
    if (!currentUser) {
      alert("Silakan login untuk menambahkan artikel ke favorit.");
      return;
    }
    toggleFavorite(article.id);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Silakan login untuk memberikan komentar.");
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Simulasi delay untuk UX
    await new Promise((res) => setTimeout(res, 500));

    const comment = {
      id: `comment-${Date.now()}`,
      content: newComment.trim(),
      author: currentUser.name,
      authorId: currentUser.id,
      date: new Date().toISOString(),
    };

    setComments((prevComments) => [comment, ...prevComments]);
    setNewComment("");
    setIsSubmitting(false);
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    }
  };

  // Fungsi untuk membersihkan HTML dari judul utama
  const sanitizeContent = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const firstHeading = div.querySelector("h1, h2");
    if (firstHeading && firstHeading.textContent === article.title) {
      firstHeading.remove();
    }
    return div.innerHTML;
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const readingTime = Math.max(
    1,
    Math.ceil(article.content.replace(/<[^>]+>/g, "").split(" ").length / 200)
  );

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tombol Kembali */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-semibold">Kembali ke Semua Artikel</span>
        </Link>

        {/* Header Artikel */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-gray-400" />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-gray-400" />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <span className="text-blue-600 font-semibold">
              {readingTime} min read
            </span>
          </div>
        </header>

        {/* Konten Artikel */}
        <article
          className="prose prose-lg max-w-none prose-indigo prose-img:rounded-xl prose-a:text-blue-600 hover:prose-a:text-blue-800"
          dangerouslySetInnerHTML={{ __html: sanitizeContent(article.content) }}
        />

        {/* Aksi & Tag */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={handleFavoriteClick}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                isFavorited
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-red-100"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
              />
              {isFavorited ? "Difavoritkan" : "Favoritkan"}
            </button>
          </div>
        </footer>

        {/* Bagian Komentar */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-indigo-500 inline-block">
            Komentar ({comments.length})
          </h2>

          {/* Form Komentar */}
          {currentUser ? (
            <form
              onSubmit={handleAddComment}
              className="mb-12 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                rows="4"
                placeholder={`Komentar sebagai ${currentUser.name}...`}
                disabled={isSubmitting}
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Komentar"}
                <Send className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <div className="mb-12 text-center bg-gray-100 p-6 rounded-lg">
              <p>
                Silakan{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  login
                </Link>{" "}
                untuk memberikan komentar.
              </p>
            </div>
          )}

          {/* Daftar Komentar */}
          <div className="space-y-8">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 items-start">
                  <div className="bg-indigo-500 text-white w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xl">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 bg-white p-5 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold text-gray-800">
                          {comment.author}
                        </span>
                        <time className="text-xs text-gray-500 ml-3">
                          {formatDate(comment.date)}
                        </time>
                      </div>
                      {currentUser && currentUser.id === comment.authorId && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                Belum ada komentar. Jadilah yang pertama!
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticleDetail;
