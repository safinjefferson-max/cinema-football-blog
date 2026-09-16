import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
    return (
        <article className="post-card">
            {post.image ? (
                <img src={post.image} alt={post.title} className="post-image" />
            ) : (
                <div className="post-image placeholder">SCREEN & PITCH</div>
            )}

            <div className="post-card-body">
                <span className="category-tag">{post.category}</span>

                <h2>{post.title}</h2>

                <p className="date">
                    {new Date(post.created_at).toLocaleDateString()}
                </p>

                <p>{post.excerpt || post.content.slice(0, 140) + "..."}</p>

                <Link to={`/post/${post.id}`} className="read-more">
                    Read article →
                </Link>
            </div>
        </article>
    );
}

export default PostCard;
