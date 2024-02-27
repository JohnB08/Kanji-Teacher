import Style from "./KanjiAnswers.module.css";

type AnswerProps = {
    HandleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    answer: string,
    className: string
}

export const KansjiAnswer = ({HandleClick, answer, className}: AnswerProps)=>{
    return (
        <button onClick={HandleClick} className={[Style.Answer, "button", className].join(" ")}>{answer}</button>
    )
}