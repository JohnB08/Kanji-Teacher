import {useState, useEffect, createContext, ReactElement } from "react"
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth"
import {auth} from "../../ConfigFiles/FirebaseConfig/FirebaseConfig";


type AuthContextType = {
    user: User | null,
    loadingUser: boolean,
    login: (email: string, password: string)=>Promise<void>,
    logout: ()=>Promise<void>
    signup: (email: string, password: string) => Promise<void>
}

type AuthProps = {
        children: ReactElement
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProps) =>{
    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoading] = useState<boolean>(true) 
    useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setLoading(true);
        if (user) {
            setUser(user)
        } else {
            setUser(null)
        }
        setLoading(false);
        })

        return unsubscribe;
    }, [])
    const login = async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
    try {
      await signOut(auth);
        } catch (error) {
        console.error('Failed to logout', error);
        }
    };
    const signup = async (email: string, password: string) =>{
        await createUserWithEmailAndPassword(auth, email, password)
    }

    return (
        <AuthContext.Provider value={{user, loadingUser, login, logout, signup}}>
            {!loadingUser && children}
        </AuthContext.Provider>
    )
    
}

export {AuthContext}