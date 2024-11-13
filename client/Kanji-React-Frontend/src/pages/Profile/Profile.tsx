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
            <p><b>Number of {mode}s attempted:</b> {userStats.timesAttempted}</p>
            <p><b>Number of {mode}s completed:</b> {userStats.timesCompleted}</p>
        </div>
        <div>
            <p><b>Most attempted {mode}:</b> {userStats.mostAttempted.char} | {userStats.mostAttempted.description}.</p>
            <p><b>Times attempted: </b>{userStats.mostAttempted.attempted}, <b>Times completed: </b>{userStats.mostAttempted.completed}</p>
        </div>
        <div>
            <p><b>Most completed {mode}:</b> {userStats.mostCompleted.char} | {userStats.mostCompleted.description}.</p>
            <p><b>Times attempted: </b>{userStats.mostCompleted.attempted}, <b>Times completed: </b>{userStats.mostCompleted.completed}</p>
        </div>
        <div>
            <p><b>Your current grade: </b>{userStats.grade}</p>
            <p><b>Your successrate: </b>{userStats.successRate}</p>
        </div>
        <div>
            <p><b>Progress to next grade: </b></p>
            <div className={Style.progressbar}>
                <div className={Style.currentprogress} style={{width: `${userStats.currentProgress * 100/userStats.currentLimit}%`}}/>
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