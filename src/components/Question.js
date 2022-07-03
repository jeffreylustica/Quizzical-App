import React from "react"

export default function Question(props) {
    const choicesElement =  props.choicesArr.map(choice => {
        let btnClassName = ""
        if (props.isGameStarted) {
            choice.isSelected? btnClassName = "answer-btn selected" : btnClassName = "answer-btn"
        } else {
            choice.isSelected && choice.isCorrect ? btnClassName = "answer-btn selected" : choice.isSelected ? btnClassName = "answer-btn selected" : choice.isCorrect ? btnClassName = "answer-btn danger" :
            btnClassName = "answer-btn fade"  
        }

        return <button key={choice.option} className={btnClassName} onClick={() => {
            props.handleUserAnswer(props.question, choice.option)
        }}>{choice.option}</button>
    })

    return (
        <div className="question-container">
            <p className="question">{props.question}</p>
            <div className="answer-choices">
                {choicesElement}
            </div>
        </div>
    )
}