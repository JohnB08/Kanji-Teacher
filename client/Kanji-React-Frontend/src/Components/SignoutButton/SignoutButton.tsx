
import { useAuth } from "../../Wrappers/FirebaseWrapper/FirebaseContext";
import { useNavigate } from "react-router-dom";



  type SignOutProps = {
    className: string
  }


  export const SignOut = ({className}: SignOutProps) =>{
    const {logout} = useAuth();
    const navigate = useNavigate();

    
    const handleSignOut = async () =>{

    try {
      await logout();
      navigate("/")
    } catch (error){
      console.error("Sign out error!", error);
    }
  }
    return (
      <button onClick={handleSignOut} className={[className, "button"].join(" ")}>Sign Out</button>
    )
  }