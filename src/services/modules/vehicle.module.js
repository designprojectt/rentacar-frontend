import instance from "../axios/axios";

const route = "vehicles";

export const getAllVehicles = async () => {
    return await instance.get(`${route}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
}

export const createVehicle = async (model) => {
    return await instance.post(`${route}`, model)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
}