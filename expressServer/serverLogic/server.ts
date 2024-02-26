import express from "express"
import cors from "cors"
import { auth, firebaseApp } from "../util/firebase/firebaseHandlers.js";

const server = express();
const port = 3000;
server.use(express.json())
server.use(cors())



/* Legge til en funksjon som tar inn, og verifier UID opp mot firebaseproject via firebase admin. */

server.post("/login", async (req,res)=>{
    const idToken = req.headers.authorization?.split("Bearer ")[1]
    if (!idToken){
        return res.status(401).json({message: "Missing Authorization Token"})
    }
    try{
        const decodedToken = await auth.verifyIdToken(idToken)
        const uid = decodedToken.uid

        /* INSERT SQL QUERY MED UID HER FOR Å FINNE POOL, QUERY RETURNER DATA OBJECT*/
        const data = "GOOD JOB!"
        return res.status(200).json({data: data})

    } catch (error){
        console.log(error)
        return res.status(403).json({message: "Unauthorized"})
    }
})






server.listen(port, ()=>{
    console.log(`Server listening on localhost on port: ${port}`)
})