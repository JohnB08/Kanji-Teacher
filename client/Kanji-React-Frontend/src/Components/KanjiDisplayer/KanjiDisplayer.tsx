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
                <h1 className={Style.Kanji}>{displayData.Kanji}</h1>
            </Textfit>
            <p className={Style.KunReadings}>{displayData.OnReadings}</p>
            <p className={Style.KunReadings}>{displayData.KunReadings}</p>
        </div>
        : ""}
        </>
    )
}