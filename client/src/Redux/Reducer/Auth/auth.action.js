import axios from "axios";

// Redus types
import { SIGN_IN, SIGN_UP } from "./auth.type";

export const signIn = (userData) => async (dispatch) => {
    try {
        const User = await axios({
            method: "POST",
            url: `http://localhost:3001/auth/signin`,
            data:{credentials : userData},
        })

        localStorage.setItem("zomatoUser", JSON.stringify({token:User.data.token}));

        return dispatch({ type: SIGN_IN, payload: User.data });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const signUp = (userData) => async (dispatch) => {
    try {
        const User = await axios({
            method: "POST",
            url: `http://localhost:3001/auth/signup`,
            data:{credentials : userData},
        })

        localStorage.setItem("zomatoUser", JSON.stringify({token:User.data.token}));

        return dispatch({ type: SIGN_UP, payload: User.data });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const googleAuth = (token) => async (dispatch) => {
    try {
        const User = await axios({
            method: "POST",
            url: `http://localhost:3001/auth/signup`,
            data: { token },
        })

        localStorage.setItem("zomatoUser", JSON.stringify({token}));

        return dispatch({ type: SIGN_UP, payload: User.data });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}