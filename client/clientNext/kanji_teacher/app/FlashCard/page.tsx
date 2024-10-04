"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KanjiDisplay } from "../Utils/KanjiDisplay/KanjiDisplay";
import { KansjiAnswer } from "../Utils/KanjiAnswers/KanjiAnswers";
import Style from "./page.module.css";
import { showUsers } from "../../scripts/firebaseConfig/firebaseConfig";
import { User } from "firebase/auth";

type FlashCardData = {
    Id: number,
    Alternatives: string[],
    Kanji: string
}

type ResultData = {
    CharacterInfo: {
        Grade: number,
        Description: string,
        Char: string,
        KunReadings: string,
        Meanings: string,
        OnReadings: string
    },
    Correct: boolean
}

const GetFlashcardData = async (user: User, loadingFunction: Dispatch<SetStateAction<boolean>>, saveDataFunction: Dispatch<SetStateAction<FlashCardData | null>>, setScreenFunction: Dispatch<SetStateAction<boolean>>) =>{
    try{
        const token = await user.getIdToken();
        loadingFunction(true);
        const options = {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
        console.log(options)
        const response = await fetch("http://localhost:5233/api/getFlashCard", options)
        if (!response.ok) return console.log(response);
        const result: FlashCardData = await response.json();
        saveDataFunction(result);
        loadingFunction(false);
        setScreenFunction(false);
        return;
    } catch(error){
        console.log(error);
        loadingFunction(false);
    }
}
const ValidateFlashCardData = async (user: User, loadingFunction: Dispatch<SetStateAction<boolean>>, saveDataFunction:Dispatch<SetStateAction<ResultData | null>>,setScreenFunction: Dispatch<SetStateAction<boolean>>, id: number, answer: string) =>
{
    try{
        const token = await user.getIdToken();
        loadingFunction(true);
        const options: RequestInit = {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }
        console.log(token)
        const Params: URLSearchParams = new URLSearchParams({id: id.toString(), answer: answer});
        const response = await fetch("http://localhost:5233/api/validateAnswer?" + Params.toString(), options);
        if (!response.ok) return console.log(response);
        const result: ResultData = await response.json();
        saveDataFunction(result);
        console.log(result);
        loadingFunction(false);
        setScreenFunction(true);
        return;
    } catch (error){
        console.log(error)
        loadingFunction(false);
        return;
    }
}



export default function FlashCard(){
    const [user] = showUsers();
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<FlashCardData | null>(null);
    const [resultData, setResultData] = useState<ResultData | null>(null)
    const [displayResults, setDisplayResults] = useState<boolean>(false);
    if (user == null) console.log(user);
    useEffect(()=>{
        GetFlashcardData(user as User, setLoading, setData, setDisplayResults)
    }, [user])
    return (
        <>
        {loading ? <p>Loading kanji...</p> : !displayResults && data != null ? 
            <>
            <div className={Style.Main}>
                <KanjiDisplay kanji={data.Kanji}/>
                    <div className={Style.ButtonContainer}>
                    {
                        data.Alternatives.map((answer: string, i: number)=>{
                            return(
                                <KansjiAnswer className={""} key={i} answer={answer} HandleClick={()=>ValidateFlashCardData(user as User, setLoading, setResultData,setDisplayResults, data.Id, answer)}/>
                            )
                        })
                    }
                </div>
            </div>
            </>
             : resultData != null ? 
            <>
            <div className={Style.Main}>
                <KanjiDisplay kanji={resultData.CharacterInfo.Char}/>
                <h2>
                    {resultData.CharacterInfo.Description}
                </h2>
                <div className={Style.TextContainer}>
                    {resultData.Correct ? <p>Correct!</p> : <p> Incorrect. </p>}
                    <p>
                        Grade: {resultData.CharacterInfo.Grade}
                    </p>
                    <p>
                        Meanings: {resultData.CharacterInfo.Meanings.split(",").join(", ")}
                    </p>
                    <p>
                        Kun readings: {resultData.CharacterInfo.KunReadings.split(",").join(", ")}
                    </p>
                    <p>
                        On readings: {resultData.CharacterInfo.OnReadings.split(",").join(", ")}
                    </p>
                </div>
                <KansjiAnswer className={""} answer="Try another character" HandleClick={()=>GetFlashcardData(user as User, setLoading, setData, setDisplayResults)}/>
            </div>
            </>
            : ""
            }
        </>
    )

}
