import { AnswerButtons } from "../../Components/AnswerButtons/AnswerButtons";
import { KanjiDisplay } from "../../Components/KanjiDisplayer/KanjiDisplayer";
import Style from "./FlashCard.module.css";


export const FlashCard = ()=>{
    return(
        <div className={Style.Main}>
                <KanjiDisplay/>
                <div className={Style.ButtonContainer}>
                    <AnswerButtons/>
                </div>
            </div>
    )
}