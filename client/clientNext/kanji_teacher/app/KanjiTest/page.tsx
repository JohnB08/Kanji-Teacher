"use client"

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import {dummydata, DummyData, DummyDataKanji, DummyDataKeys, DummyDataValues} from "../../dummydata/dummydata"
import { KanjiDisplay } from "../Utils/KanjiDisplay/KanjiDisplay";
import { KansjiAnswer } from "../Utils/KanjiAnswers/KanjiAnswers";
import Style from "./page.module.css";
import { showUsers } from "../../scripts/firebaseConfig/firebaseConfig";


const setClass = (selectedAnswer: string, CorrectAnswer: string) =>{
    if (selectedAnswer === "") return ""
    return selectedAnswer === CorrectAnswer ? "correct" : "incorrect"
}



const validateUid = (uid:string|null, data: DummyData): uid is DummyDataKeys =>{
    return typeof uid === "string" && uid in data
}



export default function KanjiTest(){
    const [user] = showUsers();
    const router = useRouter();
    const uid = user ? user.uid : null
    const [index, setIndex] = useState<number>(0)
    const [answerIsSet, setAnswer] = useState<boolean>(false)
    /* fetch med uid her til postgres */
    const selectedData = validateUid(uid, dummydata) ? dummydata[uid] : dummydata["anonymous"] as DummyDataValues
    const currentKanji = Object.keys(selectedData)[index] as DummyDataKanji
    const correctAnswer = selectedData[currentKanji].correctTranslation

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