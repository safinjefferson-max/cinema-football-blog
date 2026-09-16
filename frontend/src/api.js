import axios from "axios";

const api = axios.create({
    baseURL: "https://cinema-football-blog.onrender.com"
});

export default api;
