import { useEffect, useState, ReactNode, createContext, useCallback, useMemo } from "react";
import { useAuth } from "../FirebaseWrapper/FirebaseContext";
import { toRomaji } from "wanakana";


export type FlashCard = {
    Id: number,
    Alternatives: string[],
    Kanji: string,
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
    }
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

const limitKana = (kunreadings: string[]) => {
    let count = 0;
    const filterArray = ["-", "."];
    const returnArray = [];
    for (let i = 0; i < kunreadings.length; i++){
        
            if (filterArray.some((char)=>kunreadings[i].includes(char))){
                if (count < 2){
                    returnArray.push(kunreadings[i]);
                    count++;
                } else continue;
            } else {
                returnArray.push(kunreadings[i])
            }
    }
    return returnArray.join(", ")

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
        if (user == null) return;
        try{
            setResultData(null);
            setLoadingData(true);
            const token = await user.getIdToken();
            const options = {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }

            let url ="http://localhost:5000/api/getFlashCard"
            const query = wantToProgress ? `?progress=${wantToProgress}` : null
            if (query != null) url += query;
            const response = await fetch(url, options)
            if (!response.ok) return console.log(response);
            const result: FlashCard = await response.json();
            result.Alternatives.sort();
            result.KunReadings = limitKana(result.KunReadings.split(", "));
            result.KunReadings += ` | ${toRomaji(result.KunReadings)}`
            setDisplayData(result);
            setWantToProgress(false);
            } catch(error){
                console.log(error);
                
            } finally{
                setLoadingData(false);
            }
        }
    ,[user, wantToProgress]);

    const validateAnswer = useCallback(async (id: number, answer: string) =>{
        if (user == null) return;
        try{
            const token = await user.getIdToken();
            setLoadingData(true);
            const options: RequestInit = {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                }
            const Params: URLSearchParams = new URLSearchParams({id: id.toString(), answer: answer});
            const url =  "http://localhost:5000/api/validateAnswer?"
            const response = await fetch(url + Params.toString(), options);
            if (!response.ok) return console.log(response);
            const result: Result = await response.json();
            setResultData(result);
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
            const url = "http://localhost:5000/api/userinfo";
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
            if(user){
                await getFlashCardData()
            }
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
