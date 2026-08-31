import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../validations/postSchema.js";
import { postApi } from "../Api/PostApi.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit3, FiX, FiFileText, FiUser, FiClock } from "react-icons/fi";
import { HiOutlinePencilAlt, HiOutlineDocumentText, HiOutlineCollection } from "react-icons/hi";
import FormInput from "../components/FormInput.jsx";
import FormTextarea from "../components/FormTextarea.jsx";
import FormError from "../components/FormError.jsx";
import SubmitButton from "../components/SubmitButton.jsx";

const Posts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // "all" or "my"
  const [editingPost, setEditingPost] = useState(null); // post being edited

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { title: "", description: "" },
  });

  // Fetch posts based on active tab
  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res =
        activeTab === "all"
          ? await postApi.getAllPosts()
          : await postApi.getMyPosts();
      setPosts(res.data.posts);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  function startEditing(post) {
    setEditingPost(post);
    setValue("title", post.title);
    setValue("description", post.description);
  }

  function cancelEditing() {
    setEditingPost(null);
    reset();
  }

  async function onSubmitEdit(data) {
    toast.dismiss();
    try {
      const res = await postApi.updatePost(editingPost._id, data);
      if (res.data.success) {
        toast.success("Post updated successfully! ✅");
        setEditingPost(null);
        reset();
        fetchPosts(); // Refresh the list
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      if (serverMessage) {
        setError("general", { type: "server", message: serverMessage });
      } else {
        setError("general", {
          type: "server",
          message: "Failed to update post. Please try again.",
        });
      }
      toast.error(serverMessage || "Something went wrong");
    }
  }

  function isOwner(post) {
    return user?._id === post?.user?._id;
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const tabs = [
    { key: "all", label: "All Posts", icon: HiOutlineCollection },
    { key: "my", label: "My Posts", icon: FiFileText },
  ];

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-20%] right-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-blob" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-blob delay-2000" />

      {/* Navbar */}
      <nav className="relative z-10 border-b border-surface-lighter/50 bg-surface-light/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <HiOutlineCollection className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Posts
            </span>
          </div>

          <div className="flex items-center gap-3 animate-slide-in-right">
            <button
              onClick={() => navigate("/dashboard/create-post")}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-primary text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <FiEdit3 className="w-4 h-4" />
              <span className="hidden sm:inline">New Post</span>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-surface/80 border border-surface-lighter text-gray-300 rounded-xl text-sm font-medium hover:bg-surface-lighter/60 hover:text-white transition-all duration-300"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            <span className="bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-transparent">
              Community Posts
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            Browse posts from the community or manage your own
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 animate-fade-in-up delay-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                cancelEditing();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-accent to-primary text-white shadow-lg shadow-accent/25"
                  : "bg-surface-light/80 border border-surface-lighter/50 text-gray-400 hover:text-white hover:border-surface-lighter"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="flex items-center gap-3">
              <svg className="animate-spin w-6 h-6 text-accent" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-gray-400">Loading posts...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-20 h-20 bg-surface-light/80 border border-surface-lighter/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiFileText className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {activeTab === "my" ? "You haven't created any posts yet" : "No posts found"}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {activeTab === "my"
                ? "Start sharing your thoughts with the community!"
                : "Be the first to create a post."}
            </p>
            <button
              onClick={() => navigate("/dashboard/create-post")}
              className="px-6 py-2.5 bg-gradient-to-r from-accent to-primary text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              Create Your First Post
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <div
                key={post._id}
                className="bg-surface-light/80 backdrop-blur-xl border border-surface-lighter/50 rounded-2xl p-6 shadow-xl shadow-black/20 animate-fade-in-up hover:border-surface-lighter transition-all duration-300"
                style={{ animationDelay: `${300 + i * 80}ms` }}
              >
                {/* If editing this post */}
                {editingPost?._id === post._id ? (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <FiEdit3 className="w-5 h-5 text-accent-light" />
                        Edit Post
                      </h3>
                      <button
                        onClick={cancelEditing}
                        className="p-2 text-gray-400 hover:text-white hover:bg-surface-lighter/50 rounded-lg transition-all duration-300"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit(onSubmitEdit)}
                      className="space-y-4"
                    >
                      <FormInput
                        label="Title"
                        icon={HiOutlinePencilAlt}
                        placeholder="Post title..."
                        register={register("title")}
                        error={errors.title}
                      />
                      <FormTextarea
                        label="Content"
                        icon={HiOutlineDocumentText}
                        placeholder="Post content..."
                        register={register("description")}
                        error={errors.description}
                        rows={4}
                      />
                      <FormError error={errors.general} />
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="px-5 py-2.5 bg-surface/80 border border-surface-lighter text-gray-300 rounded-xl text-sm font-medium hover:bg-surface-lighter/60 hover:text-white transition-all duration-300"
                        >
                          Cancel
                        </button>
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          label="Save Changes"
                          loadingLabel="Saving..."
                          icon={FiEdit3}
                        />
                      </div>
                    </form>
                  </div>
                ) : (
                  /* Normal post card view */
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2 truncate">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                          {post.description}
                        </p>
                      </div>

                      {/* Edit button — only for owner */}
                      {isOwner(post) && (
                        <button
                          onClick={() => startEditing(post)}
                          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 text-accent-light rounded-xl text-sm font-medium hover:bg-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <FiEdit3 className="w-4 h-4" />
                          Edit
                        </button>
                      )}
                    </div>

                    {/* Post meta */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-surface-lighter/30">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-xs font-bold text-white">
                          {post.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <span className="text-sm text-gray-300 font-medium">
                          {post.user?.name || "Unknown"}
                        </span>
                        {isOwner(post) && (
                          <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent-light text-xs rounded-md font-medium">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <FiClock className="w-3.5 h-3.5" />
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center animate-fade-in delay-1000">
          <div className="flex justify-center gap-1.5 mb-3">
            <div className="w-2 h-1 bg-primary/30 rounded-full" />
            <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
            <div className="w-2 h-1 bg-accent/30 rounded-full" />
          </div>
          <p className="text-xs text-gray-600">
            Sheraz Company &bull; Built with ❤️
          </p>
        </div>
      </main>
    </div>
  );
};

export default Posts;
