"use client"

import { signOut } from "firebase/auth";
import { firebaseApp, showUsers } from "../../../scripts/firebaseConfig/firebaseConfig";
import { getAuth } from "firebase/auth";



  type SignOutProps = {
    className: string
  }


  export const SignOut = ({className}: SignOutProps) =>{
    const auth = getAuth(firebaseApp);
    const [user] = showUsers();

    
    const handleSignOut = async () =>{

    try {
      await signOut(auth);
      console.log(user)
    } catch (error){
      console.error("Sign out error!", error);
    }
  }
    return (
      <button onClick={handleSignOut} className={[className, "button"].join(" ")}>Sign Out</button>
    )
  }