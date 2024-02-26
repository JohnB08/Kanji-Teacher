"use client"


import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.svg";
import styles from "./page.module.css";
import { Noto_Sans_JP } from "next/font/google";
import { showUsers } from "../scripts/firebaseConfig/firebaseConfig";
import { SignOut } from "./Utils/SignoutBtn/Signout";
const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700"] });

export default function Page (){
    const [user, setUser] = showUsers()
    console.log(user)
    return (
        <main className={[styles.main, notoSansJp.className].join(" ")}>
            <Image src={Logo} alt={"Logo"} className={styles.Logo} />
            <div className={styles.LinkContainer}>
                {user ? <><Link href={"/TryIt"} className={[styles.Link, "button"].join(" ") }>Continue Lessons</Link> <SignOut className={styles.Link}/> </>:  <><Link href={"/TryIt"} className={[styles.Link, "button"].join(" ")}>Try it out!</Link>
                <Link href={"/LogIn"} className={[styles.Link, "button"].join(" ")}>Log In/Sign Up</Link></>}
               
            </div>
        </main>
    )
}