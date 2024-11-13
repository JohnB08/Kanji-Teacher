import { useEffect, useState, ReactNode, createContext, useCallback, useMemo } from "react";
import { useAuth } from "../FirebaseWrapper/FirebaseContext";


export type FlashCard = {
    id: number,
    alternatives: string[],
    kanji: string,
    onReadings: string | undefined,
    kunReadings: string | undefined
}
type CharacterInfo = {
        grade: number,
        description: string,
        char: string,
        meanings: string,
    }

export type Result = {
    characterInfo: CharacterInfo,
    correct: boolean,
    canProgress: boolean
}
type KanjiProps = {
        children: ReactNode
}
type UserStats = {
    grade: number,
    timesCompleted: number,
    timesAttempted: number,
    mostCompleted: {
        description: string | null,
        char: string | null,
        attempted: number | null,
        completed: number | null
    },
    mostAttempted: {
        description: string | null,
        char: string | null, 
        attempted: number | null,
        completed: number | null
    },
    currentProgress: number,
    currentLimit: number,
    successRate: string
}
type ExportedProps = {
    displayData: FlashCard | null,
    resultData: Result | null,
    loadingData: boolean,
    userStats: UserStats | null,
    getFlashCardData: ()=>Promise<void>,
    validateAnswer: (id: number, answer: string)=>Promise<void>,
    setWantToProgress: React.Dispatch<React.SetStateAction<boolean>>,
    fetchUserStats: ()=>Promise<void>,
    setMode: React.Dispatch<React.SetStateAction<"phrase" | "character">>
    mode: string,
    changeMode: ()=>void,
    modeSelect: boolean,
}


const KanjiContext = createContext<ExportedProps | undefined>(undefined);

export const KanjiProvider = ({children}: KanjiProps) =>{
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [displayData, setDisplayData] = useState<FlashCard | null>(null);
    const [resultData, setResultData] = useState<Result | null>(null);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [wantToProgress, setWantToProgress] = useState<boolean>(false);
    const [mode, setMode] = useState<"phrase" | "character">("phrase");
    const [modeSelect, setModeSelect] = useState<boolean>(false);
    const {user} = useAuth();

    const getUrlOptions = useCallback(async () =>{
        const options: RequestInit = {};
        if (user != null) {
            const token = await user.getIdToken();
            options.headers = {
                    Authorization : `Bearer ${token}`
                }
            }
            return options
        }, [user])


    /* UseCallback "memoriserer" en funksjon, så når context rerendres, 
    bruker context samme "memoriserte" funksjon, hvis ingenting i dependency har endret seg. */

    const getFlashCardData = useCallback(async () =>{
        setResultData(null);
        setLoadingData(true);
        try{ 
            let url =import.meta.env.VITE_SERVER_ENDPOINT + "/getFlashCard";
            const options = await getUrlOptions();
            const query = wantToProgress ? `?progress=${wantToProgress}&mode=${mode}` : `?mode=${mode}`
            if (query != null) url += query;
            const response = await fetch(url, options)
            if (!response.ok) return console.log(await response.json());
            const result: FlashCard = await response.json();
            result.alternatives.sort();
            setDisplayData(result);
            setWantToProgress(false);
            } catch(error){
                console.log(error);
                
            } finally{
                setLoadingData(false);
            }
        }
    ,[getUrlOptions, wantToProgress, mode]);

    const validateAnswer = useCallback(async (id: number, answer: string) =>{
        setLoadingData(true);
        try{
            const Params: URLSearchParams = new URLSearchParams({id: id.toString(), answer: answer, mode: mode});
            const url =  import.meta.env.VITE_SERVER_ENDPOINT;
            const options = await getUrlOptions();
            const response = await fetch(url + "/validateAnswer?"  + Params.toString(), options);
            if (!response.ok) return console.log(response);
            const result: Result = await response.json();
            setResultData(result);
        } catch (error){
            console.log(error)
        } finally
        {
            setLoadingData(false);
        }
    }, [getUrlOptions, mode])

    const fetchUserStats = useCallback(async ()=>{
        setLoadingData(true);
        try{
            const options = await getUrlOptions();
            const url = import.meta.env.VITE_SERVER_ENDPOINT;
            const response = await fetch(url + `/userinfo?mode=${mode}`, options);
            if (!response.ok) console.log(response);
            const result: UserStats = await response.json();
            setUserStats(result);
        } catch (error){
            console.error(error);
        } finally{
            setLoadingData(false);
        }

    }, [getUrlOptions, mode])

    useEffect(()=>{
        getFlashCardData();
    }, [user, getFlashCardData])
    
    useEffect(()=>{
        fetchUserStats()
    }, [fetchUserStats])

    const changeMode = useCallback(()=>{
        setModeSelect(!modeSelect);
        setMode(modeSelect ? "phrase": "character")
    }, [modeSelect]);

    /* useMemo gjør at react "memoriserer" verdiene, og bruker "memoriserte" verdier på rerender, hvis ingenting har endret seg. */

    const exportValues = useMemo<ExportedProps>(()=>({
        displayData,
        resultData,
        loadingData,
        userStats,
        fetchUserStats,
        getFlashCardData,
        setWantToProgress,
        validateAnswer,
        setMode,
        mode,
        changeMode,
        modeSelect
    }), [displayData, resultData, loadingData, userStats, fetchUserStats, getFlashCardData, validateAnswer, mode, changeMode, modeSelect])

    return (
        <KanjiContext.Provider value={exportValues}>
            {children}
        </KanjiContext.Provider>
    )
}

export {KanjiContext};
