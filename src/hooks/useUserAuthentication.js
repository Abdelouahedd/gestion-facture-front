import { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from "../context/userContext";


import axios from "axios";
import setAuthToken from '../helper/setAuthToken';
import history from '../helper/history';
import { setLogin } from '../context/actions/userActions';

export const useUserAuthentication = () => {

    const { user, dispatch } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);


    const fetchUser = useCallback(
        async () => {
            try {
                const token = window.localStorage.getItem('refreshJwt')
                if (token) {
                    await axios({
                        method: 'GET',
                        url: `api/refreshToken`,
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': `Bearer ${token}`,
                        },
                    }).then(
                        res => {
                            if (res.data.status === 403) {
                                history.push('/login');
                            }
                            setAuthToken(token)
                            dispatch(setLogin(res.data.jwt));
                            setLoading(false)
                        }
                    );
                } else {
                    history.push('/login');
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }, [dispatch]);

    useEffect(() => {
        if (user.isLoggedIn === false) {
            fetchUser()
        }
        return () => setLoading(false)
    }, [fetchUser, user.isLoggedIn])

    return {
        error,
        loading,
        isLoggedIn: user.isLoggedIn,
    }
}