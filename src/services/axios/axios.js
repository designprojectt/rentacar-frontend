import axios from "axios";
import router from "@/router";

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

instance.interceptors.response.use(response => {
    return response;
}, error => {
    if ([401, 403].includes(error.response.status)) {
        router.push('/login');
    }
    return error;
})

export default instance;