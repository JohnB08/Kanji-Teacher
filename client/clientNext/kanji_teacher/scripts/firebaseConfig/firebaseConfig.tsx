import { initializeApp } from "firebase/app"
import { useEffect, useState } from "react"
import { onAuthStateChanged, getAuth, User } from "firebase/auth"


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
}

export const firebaseApp = initializeApp(firebaseConfig)



export const showUsers = () =>{
    const [user, setUser] = useState<User | null>(null)
    useEffect(()=>{
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in")
            console.log(user)
            setUser(user)
        } else {
            console.log("User is signed out")
            setUser(null)
        }
    })

    return unsubscribe;
}, [])
return [user]
}