"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import {dummydata, kanjiData, dataInterface } from "../../dummydata/dummydata"
import { KanjiDisplay } from "../Utils/KanjiDisplay/KanjiDisplay";
import { KansjiAnswer } from "../Utils/KanjiAnswers/KanjiAnswers";
import Style from "./page.module.css";


const setClass = (selectedAnswer: string, CorrectAnswer: string) =>{
    if (selectedAnswer === "") return ""
    return selectedAnswer === CorrectAnswer ? "correct" : "incorrect"
}

export default function KanjiTest(){
    const router = useRouter();
    const [index, setIndex] = useState<number>(0)
    const [answerIsSet, setAnswer] = useState<boolean>(false)
    /* fetch med uid her til postgres */
    const selectedData: dataInterface = dummydata["anonymous"]
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