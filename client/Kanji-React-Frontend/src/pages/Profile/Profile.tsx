import { Checkbox } from "../../Components/Checkbox/Checkbox";
import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import Style from "./Profile.module.css"


export const Profile = () => {
    const {userStats, mode} = useKanji();
    return(
        <>
        {userStats ?
        <div className={Style.Main}>
        <h2>Your stats: </h2>
        <h3>Current mode: {mode}</h3>
        <div>
            <p><b>Number of {mode}s attempted:</b> {userStats.TimesAttempted}</p>
            <p><b>Number of {mode}s completed:</b> {userStats.TimesCompleted}</p>
        </div>
        <div>
            <p><b>Most attempted {mode}:</b> {userStats.MostAttempted.Char} | {userStats.MostAttempted.Description}.</p>
            <p><b>Times attempted: </b>{userStats.MostAttempted.Attempted}, <b>Times completed: </b>{userStats.MostAttempted.Completed}</p>
        </div>
        <div>
            <p><b>Most completed {mode}:</b> {userStats.MostCompleted.Char} | {userStats.MostCompleted.Description}.</p>
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
        <div>
            <p>Change mode:</p>
            <Checkbox/>
        </div>
        </div> 
        : ""}
        </>
    )
}