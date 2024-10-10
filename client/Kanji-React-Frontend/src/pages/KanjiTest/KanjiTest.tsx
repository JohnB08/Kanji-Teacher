import { AnswerButtons } from "../../Components/AnswerButtons/AnswerButtons";
import { KanjiDisplay } from "../../Components/KanjiDisplayer/KanjiDisplayer";
import Style from "./KanjiTest.module.css";


export const KanjiTest = ()=>{
    return(
        <div className={Style.Main}>
                <KanjiDisplay/>
                <div className={Style.ButtonContainer}>
                    <AnswerButtons/>
                </div>
            </div>
    )
}