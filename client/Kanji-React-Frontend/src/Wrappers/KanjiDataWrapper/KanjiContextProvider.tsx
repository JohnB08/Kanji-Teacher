import { useContext } from "react";
import { KanjiContext } from "./KanjiDataWrapper";

export const useKanji = () => {
    const context = useContext(KanjiContext);
    if (!context){
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};