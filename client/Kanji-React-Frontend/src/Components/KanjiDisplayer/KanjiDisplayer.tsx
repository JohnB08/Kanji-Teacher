import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import Style from "./KanjiDisplayer.module.css";

export const KanjiDisplay = () => {
    const {displayData} = useKanji();
    return (
        <>
        {displayData ? 
        <div className={Style.Display}>
            <h1 className={Style.Kanji}>{displayData.Kanji}</h1>
            <p className={Style.KunReadings}>{displayData.KunReadings}</p>
        </div>
        : ""}
        </>
    )
}