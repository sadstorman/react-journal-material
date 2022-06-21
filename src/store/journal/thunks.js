import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { loadNotes } from "../../helper"
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice"


export const startNewNote = () => {

    return async (dispatch, getState) => {
        dispatch(savingNewNote())

        // uid
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notas`))
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        if (!uid) throw new Error('El UID del usuario no existe')
        const notes = await loadNotes(uid)
        // console.log(...notes);
        dispatch(setNotes(notes))

    }
}