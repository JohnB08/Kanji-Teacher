import { useContext } from "react";
import { KanjiContext } from "./KanjiDataWrapper";

export const useKanji = () => {
    const context = useContext(KanjiContext);
    if (!context){
        throw new Error("useKanji must be used within a KanjiProvider");
    }
    return context;
};