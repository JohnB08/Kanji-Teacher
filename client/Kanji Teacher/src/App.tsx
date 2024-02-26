import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import firebase from "firebase/compat/app"
import { getAnalytics } from "firebase/analytics"
import { Login } from "./Pages/Login"
import { onAuthStateChanged } from "firebase/auth"
import.meta.env
import { User } from "firebase/auth"



function App() {

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
  }
  console.log(firebaseConfig)

  firebase.initializeApp(firebaseConfig)
  const [user, setUser] = useState<User | null>(null)
  useEffect(()=>{
    onAuthStateChanged(firebase.auth(), async (user)=>{
      console.log(user)
      setUser(user)
      console.log(user?.accessToken)
    })
  })

  return (

    /* Tenke på routing oppsett og bruker oppsett. Kanskje ikke vite og react er rett valg for en enkel SPA som dette her? */
    <>
    <div className="LoginTest">
      <Login auth={firebase.auth()} />
    </div>
    </>
  )
}

export default App
