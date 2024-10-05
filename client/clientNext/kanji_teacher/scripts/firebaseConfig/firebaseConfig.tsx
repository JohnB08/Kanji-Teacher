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
    const [loadingUser, setLoading] = useState<boolean>(true) 
    useEffect(()=>{
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setLoading(true);
        if (user) {
            setUser(user)
        } else {
            setUser(null)
        }
        setLoading(false);
    })

    return unsubscribe;
}, [])
return [user, loadingUser]
}