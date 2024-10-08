import Style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Wrappers/FirebaseWrapper/FirebaseContext";
import { ReactNode } from "react";

type NavBarProps = {
    children: ReactNode
}

export const Navbar = ({children}:NavBarProps) =>{
    const {user} = useAuth();
    return(
        <>
        <nav className={Style.Navbar}>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                {user ? <li><Link to={"/Profile"}>Your stats</Link></li> : ""}
            </ul>
        </nav>
        {children}
        </>
    )
}