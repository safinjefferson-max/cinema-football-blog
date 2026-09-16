import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/admin/login", { username, password });

            localStorage.setItem("admin", JSON.stringify(res.data.admin));
            navigate("/admin/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <main className="admin-screen">
            <form className="admin-login" onSubmit={login}>
                <p className="eyebrow">PRIVATE AREA</p>
                <h1>Admin Login</h1>

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default AdminLogin;
