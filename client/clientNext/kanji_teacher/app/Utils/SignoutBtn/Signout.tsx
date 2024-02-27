"use client"

import { signOut } from "firebase/auth";
import { firebaseApp, showUsers } from "../../../scripts/firebaseConfig/firebaseConfig";
import { getAuth } from "firebase/auth";
import {useRouter} from "next/navigation"



  type SignOutProps = {
    className: string
  }


  export const SignOut = ({className}: SignOutProps) =>{
    const auth = getAuth(firebaseApp);
    const [user] = showUsers();
    const router = useRouter();

    
    const handleSignOut = async () =>{

    try {
      await signOut(auth);
      console.log(user)
      router.push("/");
    } catch (error){
      console.error("Sign out error!", error);
    }
  }
    return (
      <button onClick={handleSignOut} className={[className, "button"].join(" ")}>Sign Out</button>
    )
  }