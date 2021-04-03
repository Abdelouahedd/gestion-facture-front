

export const setLogin = (token) => {
    return {
        type: "SAVE_USER",
        payload: token,
    };
}




export const logout = () => {
    return {
        type: "LOGOUT",
    };
}