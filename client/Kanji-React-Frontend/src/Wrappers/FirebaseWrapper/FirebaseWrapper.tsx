import {useState, useEffect, createContext, ReactElement } from "react"
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, Auth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"


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
    const [auth, setAuth] = useState<Auth | null>(null)
     useEffect(()=>{
        const fetchFirebaseConfig = async () =>{

                const response = await fetch("http://localhost:5000/api/config");
                const result = await response.json();
                const firebaseApp = initializeApp(result);
                const auth = getAuth(firebaseApp);
                setAuth(auth);

        };
        fetchFirebaseConfig();
    }, [])
    useEffect(()=>{
    if (auth == null) return;
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
    }, [auth])
    const login = async (email: string, password: string) => {
        if (auth == null) return;
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        if (auth == null) return;
        try {
                await signOut(auth);
            } catch (error) {
            console.error('Failed to logout', error);
        }
    };
    const signup = async (email: string, password: string) =>{
        if (auth == null) return;
        await createUserWithEmailAndPassword(auth, email, password)
    }

    return (
        <AuthContext.Provider value={{user, loadingUser, login, logout, signup}}>
            {!loadingUser && children}
        </AuthContext.Provider>
    )
    
}

export {AuthContext}