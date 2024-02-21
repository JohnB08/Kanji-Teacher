import { useEffect } from "react";
import * as firebaseui from "firebaseui"
import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css"

type props = {
    auth: any
}

export const Login = (props: props) =>{

    useEffect(()=>{
        const ui = 
        firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(props.auth);
        ui.start(".firebase-auth-container",{
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
                {
                    provider: firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
                    requireDisplayName: false
                }
            ],
            signInSuccessUrl: "/user",
            privacyPolicyUrl: "insert-privacypolicy-here"
        }), [props.auth]
    })


    return(
        <>
        <div className="firebase-auth-container"></div>
        </>
    )
}