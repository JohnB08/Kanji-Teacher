import Style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Wrappers/FirebaseWrapper/FirebaseContext";
import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import { ReactNode } from "react";

type NavBarProps = {
    children: ReactNode
}

export const Navbar = ({children}:NavBarProps) =>{
    const {user} = useAuth();
    const {fetchUserStats} = useKanji();
    const navigate = useNavigate();
    return(
        <>
        <nav className={Style.Navbar}>
            <ul>
                <li><Link to={"/"} className={Style.Links}>Home</Link></li>
                {user ? <li><Link to={"/Profile"} onClick={fetchUserStats} className={Style.Links}>Your stats</Link></li> : ""}
                <li><button className={Style.LinkButton} onClick={()=>navigate(-1)}>Go Back</button></li>
            </ul>
        </nav>
        {children}
        </>
    )
}