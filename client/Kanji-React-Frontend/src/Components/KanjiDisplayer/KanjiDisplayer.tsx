import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import Style from "./KanjiDisplayer.module.css";
import Textfit from "@namhong2001/react-textfit";

export const KanjiDisplay = () => {
    const {displayData} = useKanji();
    return (
        <>
        {displayData ? 
        <div className={Style.Display}>
            <Textfit mode="single">
                <h1 className={Style.Kanji}>{displayData.kanji}</h1>
            </Textfit>
            <p className={Style.KunReadings}>{displayData.onReadings}</p>
            <p className={Style.KunReadings}>{displayData.kunReadings}</p>
        </div>
        : ""}
        </>
    )
}