import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload, loadNotes } from "../../helper"
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"


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

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving())

        const { uid } = getState().auth
        const { active } = getState().journal

        // Sin ID pk lo asigna firebase
        const noteToFireStore = { ...active }
        delete noteToFireStore.id

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${active.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch(updateNote(active))

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push((fileUpload(file)))
        }
        const photosUrls = await Promise.all(fileUploadPromises)
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}