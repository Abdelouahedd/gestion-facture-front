import React, { useReducer, createContext } from 'react'
import UserReducer from "./reducers/UserReducer"

export const Context = createContext();

const initState = {
    isLoggedIn: false,
    jwt: window.localStorage.getItem('token'),
    info: {}
}

export default function UserProvider({ children }) {

    const [state, dispatcher] = useReducer(UserReducer, initState)
    const userMemo = React.useMemo(() => [state, dispatcher], [state]);

    const [user, dispatch] = userMemo;
    return (
        <Context.Provider
            value={{
                user,
                dispatch
            }}
        >
            {children}
        </Context.Provider>
    )
}
