import React from "react";
import { useParams } from "react-router-dom";
import postsData from "./posts";

function Post() {
    const { id } = useParams();

    const post = postsData.find(
        (post) => post.id.toString() === id
    );

    if (!post) {
        return (
            <main className="container">
                <h1>Article not found.</h1>
            </main>
        );
    }

    return (
        <main className="article-page">
            <div className="article-header">
                <span className="category-tag">{post.category}</span>

                <h1>{post.title}</h1>

                <p className="article-meta">
                    By {post.author} •{" "}
                    {new Date(post.created_at).toLocaleDateString()}
                </p>
            </div>

            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="article-image"
                />
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