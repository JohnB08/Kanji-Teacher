import { useState } from "react";
import { useKanji } from "../../Wrappers/KanjiDataWrapper/KanjiContextProvider";
import Style from "./Checkbox.module.css";


export const Checkbox = () => {
    const [checked, setChecked] = useState<boolean>(false);
    const {setMode} = useKanji();
    const changeMode = () =>{
        setChecked(!checked);
        setMode(checked ? "phrase": "character");
    }
    return (
        <div className={Style.CheckContainer}>
            <label htmlFor="modecheck" className={Style.CheckLabel}>
                <input type="checkbox" name="check" id="modecheck" className={Style.Checkbox} checked={checked} onChange={changeMode}/>
            </label>
        </div>
    )
}