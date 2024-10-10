import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import Style from "./Profile.module.css"


export const Profile = () => {
    const {userStats} = useKanji();
    return(
        <>
        {userStats ?
        <div className={Style.Main}>
        <h2>Your stats: </h2>
        
        <div>
            <p><b>Number of kanji attempted:</b> {userStats.TimesAttempted}</p>
            <p><b>Number of kanji completed:</b> {userStats.TimesCompleted}</p>
        </div>
        <div>
            <p><b>Most attempted character:</b> {userStats.MostAttempted.Char} | {userStats.MostAttempted.Description}.</p>
            <p><b>Times attempted: </b>{userStats.MostAttempted.Attempted}, <b>Times completed: </b>{userStats.MostAttempted.Completed}</p>
        </div>
        <div>
            <p><b>Most completed character:</b> {userStats.MostCompleted.Char} | {userStats.MostCompleted.Description}.</p>
            <p><b>Times attempted: </b>{userStats.MostCompleted.Attempted}, <b>Times completed: </b>{userStats.MostCompleted.Completed}</p>
        </div>
        <div>
            <p><b>Your current grade: </b>{userStats.Grade}</p>
            <p><b>Your successrate: </b>{userStats.SuccessRate}</p>
        </div>
        <div>
            <p><b>Progress to next grade: </b></p>
            <div className={Style.progressbar}>
                <div className={Style.currentprogress} style={{width: `${userStats.CurrentProgress * 100/userStats.CurrentLimit}%`}}/>
            </div>
        </div>
        </div> 
        : ""}
        </>
    )
}