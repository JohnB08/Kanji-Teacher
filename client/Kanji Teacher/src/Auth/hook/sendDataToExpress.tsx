import { useEffect, useState } from "react";

interface ApiResponse<T> {
    data?: T | null
    message?: string | null
}

export const  fetchInfo = async <T,/* KOMMA I REACT */>(options: RequestInit | undefined): Promise<ApiResponse<T>>=>{
    const [data, setData] = useState<T|null>(null)
    const [message, setMessage] = useState<string|null>(null)
    useEffect(()=>{
        const fetchFromApi = async()=>{
            if (!options){
                return {message: "No header"}
            }
            try{
            const response = await fetch("http://localhost:3000/", options)
            const result = await response.json()
            if (result.data){
                setData(result.data)
            } else {
                setMessage(result.message)
            }
        } catch(error){
            console.log(error)
        }
        }
        fetchFromApi();
    }, [options])
    return {data, message}
}