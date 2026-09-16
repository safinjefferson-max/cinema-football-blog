import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const emptyForm = {
    title: "",
    category: "Cinema",
    image: "",
    excerpt: "",
    content: ""
};

function AdminDashboard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const admin = localStorage.getItem("admin");

        if (!admin) {
            navigate("/admin");
            return;
        }

        loadPosts();
    }, [navigate]);

    const loadPosts = () => {
        api.get("/posts").then((res) => setPosts(res.data));
    };

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const savePost = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            if (editingId) {
                await api.put(`/posts/${editingId}`, form);
                setMessage("Article updated.");
            } else {
                await api.post("/posts", form);
                setMessage("Article published.");
            }

            setForm(emptyForm);
            setEditingId(null);
            loadPosts();
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong.");
        }
    };

    const editPost = (post) => {
        setEditingId(post.id);
        setForm({
            title: post.title,
            category: post.category,
            image: post.image || "",
            excerpt: post.excerpt || "",
            content: post.content
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deletePost = async (id) => {
        if (!window.confirm("Delete this article?")) return;

        await api.delete(`/posts/${id}`);
        loadPosts();
    };

    const logout = () => {
        localStorage.removeItem("admin");
        navigate("/admin");
    };

    return (
        <main className="admin-page">
            <div className="admin-top">
                <div>
                    <p className="eyebrow">ADMIN DASHBOARD</p>
                    <h1>{editingId ? "Edit article" : "Write a new article"}</h1>
                </div>
                <button className="secondary" onClick={logout}>Logout</button>
            </div>

            <form className="editor" onSubmit={savePost}>
                <input
                    name="title"
                    placeholder="Article title"
                    value={form.title}
                    onChange={change}
                    required
                />

                <select name="category" value={form.category} onChange={change}>
                    <option>Cinema</option>
                    <option>Football</option>
                </select>

                <input
                    name="image"
                    placeholder="Image URL (optional)"
                    value={form.image}
                    onChange={change}
                />

                <input
                    name="excerpt"
                    placeholder="Short excerpt"
                    value={form.excerpt}
                    onChange={change}
                />

                <textarea
                    name="content"
                    placeholder="Write your article here..."
                    value={form.content}
                    onChange={change}
                    required
                />

                <div className="editor-buttons">
                    <button type="submit">
                        {editingId ? "Update Article" : "Publish Article"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="secondary"
                            onClick={() => {
                                setEditingId(null);
                                setForm(emptyForm);
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {message && <p className="success">{message}</p>}
            </form>

            <section className="admin-posts">
                <h2>Your articles</h2>

                {posts.map((post) => (
                    <div className="admin-post" key={post.id}>
                        <div>
                            <span className="category-tag">{post.category}</span>
                            <h3>{post.title}</h3>
                            <small>
                                {new Date(post.created_at).toLocaleDateString()}
                            </small>
                        </div>

                        <div className="admin-actions">
                            <button className="secondary" onClick={() => editPost(post)}>
                                Edit
                            </button>
                            <button className="danger" onClick={() => deletePost(post.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default AdminDashboard;
