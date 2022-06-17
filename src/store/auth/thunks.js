import { loginWithEmailAndPassword, logOutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, finishCheckingCredentials, login, logOut } from "./authSlice"

export const checkingAuthentication = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const result = await signInWithGoogle()

        if (!result.ok) return dispatch(logOut(result.errorMessage))

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })
        if (!ok) return dispatch(logOut({ errorMessage }))

        dispatch(login({ uid, displayName, photoURL, email }))
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials())

        const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailAndPassword({ email, password })
        dispatch(finishCheckingCredentials())

        if (!ok) return dispatch(logOut({ errorMessage }))
        dispatch(login({ uid, displayName, photoURL, email }))

    }
}

export const startLogOut = () => {
    return async (dispatch) => {

        await logOutFirebase()

        dispatch(logOut({}))
    }
}