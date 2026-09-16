import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import PostCard from "../components/PostCard";

function Home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.get("/posts")
            .then((res) => setPosts(res.data))
            .catch(() => {});
    }, []);

    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main>
            <section className="hero">
                <div>
                    <p className="eyebrow">CINEMA • FOOTBALL • STORIES</p>
                    <h1>What we watch.<br />What we love.</h1>
                    <p>
                        Daily stories, opinions and news from the world of cinema
                        and football.
                    </p>
                </div>
            </section>

            <section className="container">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">LATEST</p>
                        <h2>Latest stories</h2>
                    </div>

                    <input
                        className="search"
                        placeholder="Search stories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="category-links">
                    <Link to="/cinema">Explore Cinema →</Link>
                    <Link to="/football">Explore Football →</Link>
                </div>

                <div className="post-grid">
                    {filtered.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="empty">No stories found.</p>
                )}
            </section>
        </main>
    );
}

export default Home;
