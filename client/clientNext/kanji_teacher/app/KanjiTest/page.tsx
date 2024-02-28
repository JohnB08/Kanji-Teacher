"use client"

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import {dummydata, kanjiData, dataInterface } from "../../dummydata/dummydata"
import { KanjiDisplay } from "../Utils/KanjiDisplay/KanjiDisplay";
import { KansjiAnswer } from "../Utils/KanjiAnswers/KanjiAnswers";
import Style from "./page.module.css";
import { showUsers } from "../../scripts/firebaseConfig/firebaseConfig";


const setClass = (selectedAnswer: string, CorrectAnswer: string) =>{
    if (selectedAnswer === "") return ""
    return selectedAnswer === CorrectAnswer ? "correct" : "incorrect"
}

type DataKeys = "anonymous" | "Qy8Y7izWhNS66chGKtVvclx4Zr53"


const validateUid = (uid:string|null, data: any): uid is DataKeys =>{
    return typeof uid === "string" && uid in data
}




export default function KanjiTest(){
    const [user] = showUsers();
    const router = useRouter();
    const uid = user ? user.uid : null
    const [index, setIndex] = useState<number>(0)
    const [answerIsSet, setAnswer] = useState<boolean>(false)
    /* fetch med uid her til postgres */
    const selectedData: dataInterface = validateUid(uid, dummydata) ? dummydata[uid] : dummydata["anonymous"]
    const currentKanji = Object.keys(selectedData)[index]
    let correctAnswer = ""
    if (currentKanji in selectedData){
        const kanji = selectedData[currentKanji] as kanjiData;
        correctAnswer = kanji.correctTranslation
    }

    const routeIndex = () =>{
        if (index >= (Object.keys(selectedData).length)-1) return router.push("/")
        else {
            setIndex(index+1)
            setAnswer(false)
        }
    }

    const validateCorrectAnswer = () => {
        setAnswer(true)
        setTimeout(()=>{routeIndex()}, 1000)
    }
    console.log(answerIsSet)
    return (
        <div className={Style.Main}>
            <KanjiDisplay kanji={currentKanji}/>
            <div className={Style.ButtonContainer}>
            {
                selectedData[currentKanji]?.possibleAnswers.map((answer: string, i: number)=>{
                    return(
                        <KansjiAnswer className={answerIsSet ? setClass(answer, correctAnswer) : ""} key={i} answer={answer} HandleClick={validateCorrectAnswer}/>
                    )
                })
            }
            </div>
        </div>
    )

}