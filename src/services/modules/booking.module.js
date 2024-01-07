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

export const getMyRentals = async (model) => {
    return await instance.get(`${route}/my`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
}