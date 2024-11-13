import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import Style from "./AnswerButtons.module.css";
import { toUpper } from "../../Utilities/ToUpper/ToUpper";

export const AnswerButtons = ()=>{
    const {displayData, resultData, validateAnswer, setWantToProgress,getFlashCardData, loadingData} = useKanji();
    return (
        <>
            {displayData ? 
            displayData.alternatives.map((answer, i)=>{
                return (
                    <div key={i}>
                        <button 
                            onClick={async()=> await validateAnswer(displayData.id, answer)} 
                            className={["button", resultData ? resultData.characterInfo.description == answer ? "correct small" : "incorrect small" : "large"].join(" ")}
                            disabled={resultData || loadingData ? true : false}
                        >
                            {toUpper(answer)}
                        </button>
                        {
                            resultData && resultData.characterInfo.description == answer ? 
                            <div className={Style.textContainer}>
                            <p><b>Grade: </b>N{resultData.characterInfo.grade}</p>
                            <p><b>Meanings: </b>{resultData.characterInfo.meanings}</p>
                            {
                                resultData && resultData.canProgress ? 
                                    <>
                                    <p><b>Good job progressing!</b></p>
                                    <button
                                        onClick={async()=>{
                                            setWantToProgress(true);
                                            await getFlashCardData();
                                        }}
                                        className="button small"
                                        >
                                        Upgrade and get new Kanji
                                    </button>
                                </> : "" 
                            }
                            <button
                                onClick={getFlashCardData}
                                className="button small"
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