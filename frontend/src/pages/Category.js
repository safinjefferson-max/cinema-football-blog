import React, { useEffect, useState } from "react";
import api from "../api";
import PostCard from "../components/PostCard";

function Category({ category }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get(`/posts/category/${category}`)
            .then((res) => setPosts(res.data))
            .catch(() => {});
    }, [category]);

    return (
        <main className="container category-page">
            <p className="eyebrow">{category.toUpperCase()}</p>
            <h1>{category} stories</h1>
            <p className="lead">
                The latest stories, opinions and updates from {category.toLowerCase()}.
            </p>

            <div className="post-grid">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {posts.length === 0 && (
                <p className="empty">No {category.toLowerCase()} stories yet.</p>
            )}
        </main>
    );
}

export default Category;
