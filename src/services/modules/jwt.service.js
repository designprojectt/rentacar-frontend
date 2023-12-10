export const saveToken = (token) => {
    localStorage.setItem("token", token);
}

export const getToken = () => {
    return localStorage.getItem("token") ?? null;
}

export const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const userProfile = () => {
    return getToken() !== null ? parseJwt(getToken()).user: null;
}

export const logoutUser = () => {
    localStorage.removeItem("token");
}