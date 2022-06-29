import React, { useState } from "react"

export default function Question(props) {
    const choicesElement =  props.choicesArr.map(choice => {
        return <button key={choice.option} className={choice.isSelected? "answer-btn selected" : "answer-btn"} onClick={() => {
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