import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import Style from "./AnswerButtons.module.css";

export const AnswerButtons = ()=>{
    const {displayData, resultData, validateAnswer, setWantToProgress,getFlashCardData} = useKanji();
    return (
        <>
            {displayData ? 
            displayData.Alternatives.map((answer, i)=>{
                return (
                    <div key={i}>
                        <button 
                            onClick={async()=> await validateAnswer(displayData.Id, answer)} 
                            className={[Style.Answer, "button", resultData ? resultData.CharacterInfo.Description == answer ? "correct" : "incorrect" : ""].join(" ")}
                            disabled={resultData ? true : false}
                        >
                            {answer}
                        </button>
                        {
                            resultData && resultData.CharacterInfo.Description == answer ? 
                            <div className={Style.textContainer}>
                            <h2>{resultData.Correct ? "Correct!" : "Incorrect."}</h2>
                            <p><b>{resultData.CharacterInfo.Description}</b></p>
                            <p><b>Grade: </b>{resultData.CharacterInfo.Grade}</p>
                            <p><b>Meanings: </b>{resultData.CharacterInfo.Meanings}</p>
                            {
                                resultData && resultData.CanProgress ? 
                                    <>
                                    <p><b>Good job progressing!</b></p>
                                    <button
                                        onClick={async()=>{
                                            setWantToProgress(true);
                                            await getFlashCardData();
                                        }}
                                        className="button"
                                        >
                                        Upgrade and get new Kanji
                                    </button>
                                </> : "" 
                            }
                            <button
                                onClick={getFlashCardData}
                                className="button"
                                >
                                    Get new kanji
                            </button>
                            </div>
                            
                            :""
                        }
                    </div>
                )
            }) : ""}
        </>
    )
}