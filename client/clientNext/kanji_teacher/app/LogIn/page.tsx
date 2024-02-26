"use client"

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, {FormEvent, useState} from "react";
import { firebaseApp, showUsers } from "../../scripts/firebaseConfig/firebaseConfig"
import Style from "./page.module.css"
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { SignOut } from "../Utils/SignoutBtn/Signout";


export default function LoginPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string|null>(null);
  const [authStyle, setAuthStyle] = useState<string>("");
  const auth = getAuth(firebaseApp);
  const [showLogin, setShowLogin] = useState<boolean>(true);  
  const [user, setUser] = showUsers()
  console.log(user)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error){
      console.error("Login Error!", error);
      setAuthError("Invalid email or password");
      setAuthStyle(Style.Error);
    }
  }

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      authError ? setAuthError(null) : null;
      authStyle ? setAuthStyle("") : null;
    } catch (error){
      console.error("Signup Error!", error);
      setAuthError("Email allready in use");
      setAuthStyle(Style.Error);
    }
  
  }

  const toggleForm = () =>{
    setShowLogin(!showLogin)
  }


  


  return (
    <div className={Style.MainContainer}>
      <Link href={"/"}><Image src={Logo} alt="Kanji Teacher Logo"/></Link>
      {user ? <SignOut className=""/> : showLogin ? 
      <>
      <form onSubmit={handleLogin} className={Style.main}>
        <div className={[Style.EmailInput, authStyle].join(" ")}>
          <label htmlFor="email">{authError ? authError : "Email: "}</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={Style.PasswordInput}>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={Style.ButtonContainer}>
        <button type="submit" className={Style.SubmitBtn}>Log in</button>
      </div>
        <button onClick={toggleForm} className={Style.ToggleBtn}>New User? Sign Up</button>
      </form>
      </>
      :
      <>
        <form onSubmit={handleSignup} className={Style.main}>
        <div className={[Style.EmailInput, authStyle].join(" ")}>
          <label htmlFor="email">{authError ? authError : "Email: "}</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={Style.PasswordInput}>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={Style.ButtonContainer}>
        <button type="submit" className={Style.SubmitBtn}>Sign up!</button>
      </div>
        <button onClick={toggleForm} className={Style.ToggleBtn}>Back to log In</button>
      </form>
      </>
      }

    </div>
  );
}
