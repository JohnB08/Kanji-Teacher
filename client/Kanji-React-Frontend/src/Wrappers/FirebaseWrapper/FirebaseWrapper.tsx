import {useState, useEffect, createContext, ReactElement } from "react"
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, Auth, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { initializeApp } from "firebase/app"


type AuthContextType = {
    user: User | null,
    loadingUser: boolean,
    login: (email: string, password: string)=>Promise<void>,
    logout: ()=>Promise<void>,
    signup: (email: string, password: string) => Promise<void>,
    signInWithGoogle: ()=>Promise<void>
}

type AuthProps = {
        children: ReactElement
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProps) =>{
    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoading] = useState<boolean>(true) 
    const [auth, setAuth] = useState<Auth | null>(null)
    const googleAuth = new GoogleAuthProvider();
     useEffect(()=>{
        const fetchFirebaseConfig = async () =>{
            try {
                console.log(import.meta.env.MODE);
                const url  = import.meta.env.VITE_SERVER_ENDPOINT;
                const response = await fetch(url + "/config");
                const result = await response.json();
                const firebaseApp = initializeApp(result);
                setAuth(getAuth(firebaseApp));
            } catch (error) {
                console.error('Failed to fetch firebase config from backend', error)
            }

        };
        fetchFirebaseConfig();
    }, [])
    useEffect(()=>{
        if (auth == null) return;
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true);
            setUser(user);
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

    const signInWithGoogle = async ()=>{
        if (auth == null) return;
        try{
            await signInWithPopup(auth, googleAuth)
        } catch (error) {
            console.error('Failed to sign in with google', error)
        }
    } 

    return (
        <AuthContext.Provider value={{user, loadingUser, login, logout, signup, signInWithGoogle}}>
            {!loadingUser && children}
        </AuthContext.Provider>
    )
    
}

export {AuthContext}