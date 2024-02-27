import { Suspense } from "react";
import Link from "next/link";
import dummydata from "../../dummydata/dummydata.json"


type QuizProps = {
    uid: string | null;
}
type DummyData = typeof dummydata

type DummyDataKeys = keyof DummyData

const validateUid = (uid:string|null, data: DummyData): uid is DummyDataKeys =>{
    return typeof uid === "string" && uid in data
}

export default function KanjiTest({uid=null}: QuizProps){
    /* fetch med uid her til postgres */
    const selectedData = validateUid(uid, dummydata) ? dummydata[uid] : dummydata["anonymous"]
    console.log(selectedData)
    console.log(uid)

    return (
        <div>
            <h1>QUIZ ELEMENTER KOMMER HER</h1>
        </div>
    )

}