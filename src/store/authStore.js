import { writable } from 'svelte/store';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const authStore = writable({
    isLoading: true,
    currentUser: null
})

export const authHandler = {
    signup: async (auth, email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    },
    login: async (auth, email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    },
    logout: async (auth) => {
        await signOut(auth);
    },
    resetPassword: async (auth, email) => {
        await sendPasswordResetEmail(auth, email);
    }
}