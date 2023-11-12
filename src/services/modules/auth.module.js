import instance from "../axios/axios";

const route = "auths";

export const registerUser = async (model) => {
    return await instance.post(`${route}/register`, model)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
}

export const loginUser = async (model) => {
    return await instance.post(`${route}/login`, model)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
}