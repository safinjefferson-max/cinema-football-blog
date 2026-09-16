import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get(`/posts/${id}`)
            .then((res) => setPost(res.data))
            .catch(() => setError("Article not found."));
    }, [id]);

    if (error) return <main className="container"><h1>{error}</h1></main>;
    if (!post) return <main className="container"><p>Loading...</p></main>;

    return (
        <main className="article-page">
            <div className="article-header">
                <span className="category-tag">{post.category}</span>
                <h1>{post.title}</h1>
                <p className="article-meta">
                    By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                </p>
            </div>

            {post.image && (
                <img src={post.image} alt={post.title} className="article-image" />
            )}

            <div className="article-content">
                {post.content.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </main>
    );
}

export default Post;
