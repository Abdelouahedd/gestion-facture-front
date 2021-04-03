
export default function UserReducer(user, action) {
    switch (action.type) {
        case 'SAVE_USER':
            return {
                ...user,
                isLoggedIn: true,
                jwt: action.payload,
            }
        case 'GET_USER':
            return {
                ...user,
                isLoggedIn: true,
                info: action.payload
            }
        case 'LOGOUT':
            return {
                ...user,
                isLoggedIn: false,
                jwt: {},
                info: {}
            }
        default:
            return user
    }
}
