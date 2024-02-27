import Style from "./KanjiDisplay.module.css";

type KanjiProps ={
    kanji: string
}

export const KanjiDisplay = ({kanji}: KanjiProps) => {
    return (
        <div className={Style.Display}>
            <h1 className={Style.Kanji}>{kanji}</h1>
        </div>
    )
}