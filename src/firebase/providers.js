import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)

        // INFO UTIL EN CREDENTIALS
        // const credentials = GoogleAuthProvider.credentialFromResult(result)

        const { displayName, email, photoURL, uid } = result.user
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message

        return {
            ok: false,
            errorCode,
            errorMessage
        }

    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user

        //Actualizar displayNAme a firebase

        await updateProfile(FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {

        const errorMessage = error.message

        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { displayName, photoURL, uid } = resp.user
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {

        const errorMessage = error.message

        return {
            ok: false,
            errorMessage
        }
    }

}

export const logOutFirebase = async() => {
    return await FirebaseAuth.signOut()
}