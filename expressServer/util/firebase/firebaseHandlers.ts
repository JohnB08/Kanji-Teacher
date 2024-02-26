import { initializeApp } from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";


const parsedEnv = JSON.parse(process.env.FIREBASE_AUTH as string)


export const firebaseApp = initializeApp({
    credential: cert(parsedEnv)
})

export const auth = getAuth()

