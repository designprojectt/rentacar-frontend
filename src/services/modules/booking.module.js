import instance from "../axios/axios";

const route = "bookings";

export const rentCar = async (model) => {
    return await instance.post(`${route}`, model)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
}