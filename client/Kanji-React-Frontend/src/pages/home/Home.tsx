import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import styles from "./Home.module.css";
import { useAuth } from "../../Wrappers/FirebaseWrapper/FirebaseContext";
import { SignOut } from "../../Components/SignoutButton/SignoutButton";

export default function Home (){
    const {user} = useAuth();
    return (
        <main className={styles.main}>
            <img src={Logo} alt={"Logo"} className={styles.Logo} />
            <div className={styles.LinkContainer}>
                {user ? <><Link to={"/FlashCard"} className={[styles.Link, "button large"].join(" ") }>Continue Lessons</Link> <SignOut className={styles.Link}/> </>:  <><Link to={"/KanjiTest"} className={[styles.Link, "button large"].join(" ")}>Try it out!</Link>
                <Link to={"/Login"} className={[styles.Link, "button large"].join(" ")}>Log In/Sign Up</Link></>}
            </div>
        </main>
    )
}