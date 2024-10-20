import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import Style from "./Checkbox.module.css";


export const Checkbox = () => {
    const {modeSelect, changeMode} = useKanji();
    return (
        <div className={Style.CheckContainer}>
            <label htmlFor="modecheck" className={Style.CheckLabel}>
                <input type="checkbox" name="check" id="modecheck" className={Style.Checkbox} checked={modeSelect} onChange={changeMode}/>
            </label>
        </div>
    )
}