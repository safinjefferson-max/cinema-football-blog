const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "safin@sql93611",
    database: "cinema_football_blog"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("MySQL connected");
    }
});

app.get("/", (req, res) => {
    res.send("Cinema & Football Blog API is running");
});

// Get all posts
app.get("/posts", (req, res) => {
    const sql = "SELECT * FROM posts ORDER BY created_at DESC";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Could not get posts" });
        res.json(result);
    });
});

// Get posts by category
app.get("/posts/category/:category", (req, res) => {
    const category = req.params.category;

    const sql = "SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC";

    db.query(sql, [category], (err, result) => {
        if (err) return res.status(500).json({ message: "Could not get posts" });
        res.json(result);
    });
});

// Get one post
app.get("/posts/:id", (req, res) => {
    const sql = "SELECT * FROM posts WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Could not get post" });

        if (result.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(result[0]);
    });
});

// Admin login
app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM admins WHERE username = ?";

    db.query(sql, [username], async (err, result) => {
        if (err) return res.status(500).json({ message: "Login failed" });

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const admin = result[0];

        // Supports the simple starter password in database.sql.
        // After first setup, replace it with a bcrypt hash.
        let valid = password === admin.password;

        if (!valid) {
            try {
                valid = await bcrypt.compare(password, admin.password);
            } catch (e) {
                valid = false;
            }
        }

        if (!valid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.json({
            message: "Login successful",
            admin: {
                id: admin.id,
                username: admin.username
            }
        });
    });
});

// Create post
app.post("/posts", (req, res) => {
    const { title, category, image, excerpt, content, author } = req.body;

    if (!title || !category || !content) {
        return res.status(400).json({ message: "Title, category and content are required" });
    }

    const sql = `
        INSERT INTO posts (title, category, image, excerpt, content, author)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, category, image || "", excerpt || "", content, author || "Admin"],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Could not create post" });

            res.json({
                message: "Post published successfully",
                id: result.insertId
            });
        }
    );
});

// Update post
app.put("/posts/:id", (req, res) => {
    const { title, category, image, excerpt, content } = req.body;

    const sql = `
        UPDATE posts
        SET title = ?, category = ?, image = ?, excerpt = ?, content = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, category, image || "", excerpt || "", content, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ message: "Could not update post" });

            res.json({ message: "Post updated successfully" });
        }
    );
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    const sql = "DELETE FROM posts WHERE id = ?";

    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Could not delete post" });

        res.json({ message: "Post deleted successfully" });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
