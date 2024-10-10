import { useEffect, useState, ReactNode, createContext, useCallback, useMemo } from "react";
import { useAuth } from "../FirebaseWrapper/FirebaseContext";


export type FlashCard = {
    Id: number,
    Alternatives: string[],
    Kanji: string,
    OnReadings: string,
    KunReadings: string
}
type CharacterInfo = {
        Grade: number,
        Description: string,
        Char: string,
        Meanings: string,
    }

export type Result = {
    CharacterInfo: CharacterInfo,
    Correct: boolean,
    CanProgress: boolean
}
type KanjiProps = {
        children: ReactNode
}
type UserStats = {
    Grade: number,
    TimesCompleted: number,
    TimesAttempted: number,
    MostCompleted: {
        Description: string | null,
        Char: string | null,
        Attempted: number | null,
        Completed: number | null
    },
    MostAttempted: {
        Description: string | null,
        Char: string | null, 
        Attempted: number | null,
        Completed: number | null
    },
    CurrentProgress: number,
    CurrentLimit: number,
    SuccessRate: string
}
type ExportedProps = {
    displayData: FlashCard | null,
    resultData: Result | null,
    loadingData: boolean,
    userStats: UserStats | null,
    getFlashCardData: ()=>Promise<void>,
    validateAnswer: (id: number, answer: string)=>Promise<void>,
    setWantToProgress: React.Dispatch<React.SetStateAction<boolean>>,
    fetchUserStats: ()=>Promise<void>
}


const KanjiContext = createContext<ExportedProps | undefined>(undefined);

export const KanjiProvider = ({children}: KanjiProps) =>{
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [displayData, setDisplayData] = useState<FlashCard | null>(null);
    const [resultData, setResultData] = useState<Result | null>(null);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [wantToProgress, setWantToProgress] = useState<boolean>(false);
    const {user} = useAuth();

    /* UseCallback "memoriserer" en funksjon, så når context rerendres, 
    bruker context samme "memoriserte" funksjon, hvis ingenting i dependency har endret seg. */

    const getFlashCardData = useCallback(async () =>{
        try{
            setResultData(null);
            setLoadingData(true);
            let url ="/api/getFlashCard"

            if (user == null){
                const query = wantToProgress ? `?progress=${wantToProgress}` : null
                if (query != null) url += query;
                const response = await fetch(url)
                if (!response.ok) return console.log(await response.json());
                const result: FlashCard = await response.json();
                result.Alternatives.sort();
                setDisplayData(result);  
            } else {
                const token = await user.getIdToken();
                const options = {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                }
                const query = wantToProgress ? `?progress=${wantToProgress}` : null
                if (query != null) url += query;
                const response = await fetch(url, options)
                if (!response.ok) return console.log(await response.json());
                const result: FlashCard = await response.json();
                result.Alternatives.sort();
                setDisplayData(result);
            }
            setWantToProgress(false);
            } catch(error){
                console.log(error);
                
            } finally{
                setLoadingData(false);
            }
        }
    ,[user, wantToProgress]);

    const validateAnswer = useCallback(async (id: number, answer: string) =>{
        try{
            const Params: URLSearchParams = new URLSearchParams({id: id.toString(), answer: answer});
            const url =  "/api/validateAnswer?"
            if (user == null){
                
                const response = await fetch(url + Params.toString());
                if (!response.ok) return console.log(response);
                const result: Result = await response.json();
                setResultData(result);
            } else {
                const token = await user.getIdToken();
                setLoadingData(true);
                const options: RequestInit = {
                        headers: {
                            Authorization : `Bearer ${token}`
                        }
                    }
                const response = await fetch(url + Params.toString(), options);
                if (!response.ok) return console.log(response);
                const result: Result = await response.json();
                setResultData(result);
            }
        } catch (error){
            console.log(error)
        } finally
        {
            setLoadingData(false);
        }
    }, [user])

    const fetchUserStats = useCallback(async ()=>{
        try{
            if (user == null) return;
            const token = await user.getIdToken();
            setLoadingData(true);
            const options: RequestInit = {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }
            const url = "/api/userinfo";
            const response = await fetch(url, options);
            if (!response.ok) console.log(response);
            const result: UserStats = await response.json();
            setUserStats(result);
        } catch (error){
            console.error(error);
        } finally{
            setLoadingData(false);
        }

    }, [user])

    useEffect(()=>{
        const fetchInitialData = async () =>{
                await getFlashCardData()
        };
        fetchInitialData()
    }, [user, getFlashCardData])

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
    }), [displayData, resultData, loadingData, userStats, fetchUserStats, getFlashCardData, validateAnswer])

    return (
        <KanjiContext.Provider value={exportValues}>
            {children}
        </KanjiContext.Provider>
    )
}

export {KanjiContext};
