import express from "express"
import cors from "cors"

const server = express();
server.use(express.json())
server.use(cors())


/* Legge til en funksjon som tar inn, og verifier UID opp mot firebaseproject via firebase admin. */