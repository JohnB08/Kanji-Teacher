import { UserType } from "../types/types.js"


export const validateBodyAsUser = (user: unknown): user is UserType =>{
    return (
        typeof user === "object" &&
        typeof (user as UserType).uid === "string"
    )
}