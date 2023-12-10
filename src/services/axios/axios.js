import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api/",
    responseType: 'json',
    timeout: 20000,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
})

export default instance;