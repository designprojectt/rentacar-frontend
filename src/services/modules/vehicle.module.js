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