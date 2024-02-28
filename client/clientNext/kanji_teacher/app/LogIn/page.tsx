"use client"

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, {FormEvent, useState} from "react";
import { firebaseApp, showUsers } from "../../scripts/firebaseConfig/firebaseConfig"
import Style from "./page.module.css"
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { SignOut } from "../Utils/SignoutBtn/Signout";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";


export default function LoginPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string|null>(null);
  const [authStyle, setAuthStyle] = useState<string>("");
  const auth = getAuth(firebaseApp);
  const [showLogin, setShowLogin] = useState<boolean>(true);  
  const [user] = showUsers()
  const router = useRouter();
  console.log(user)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/KanjiTest");
    } catch (error){
      if (error instanceof FirebaseError){
        console.log(error.code)
        switch (error.code){
          case "auth/user-not-found":
            setAuthError("User not found");
            setAuthStyle(Style.Error);
            break;
          case "auth/invalid-credential":
            setAuthError("Invalid email or password");
            setAuthStyle(Style.Error);
            break;
          case "auth/missing-password":
            setAuthError("Password is missing");
            setAuthStyle(Style.Error);
            break;
          default:
            setAuthError("Something went wrong");
            setAuthStyle(Style.Error);
            break;
        }
    } else {
      console.log("Login Error!", error);
      setAuthError("Something went wrong");
      setAuthStyle(Style.Error);
    }
  }
}

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      authError ? setAuthError(null) : null;
      authStyle ? setAuthStyle("") : null;
      router.push("/KanjiTest");
    } catch (error){
      if (error instanceof FirebaseError){
        console.log(error.code)
        switch (error.code){
          case "auth/email-already-in-use":
            setAuthError("Email already in use");
            setAuthStyle(Style.Error);
            break;
          case "auth/invalid-email":
            setAuthError("Invalid email");
            setAuthStyle(Style.Error);
            break;
          case "auth/missing-password":
            setAuthError("Password is missing");
            setAuthStyle(Style.Error);
            break;
          case "auth/weak-password":
            setAuthError("Weak password");
            setAuthStyle(Style.Error);
            break;
          default:
            setAuthError("Something went wrong");
            setAuthStyle(Style.Error);
            break;
        }
    } else {
      console.log("Login Error!", error);
      setAuthError("Something went wrong");
      setAuthStyle(Style.Error);
    }
  
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
