import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api/",
    responseType: 'json',
    timeout: 20000,
});

export default instance;