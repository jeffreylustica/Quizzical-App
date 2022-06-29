import React from "react"
import Question from "./Question"

export default function Main(props) {  
    const questions = props.quizzes.map((quiz) => {
        const {question, correct_answer, incorrect_answers, shuffled_choices} = quiz
        return (
            <Question 
                key= {question}
                question = {question}
                choicesArr = {shuffled_choices}
                correct_answer = {correct_answer}
                handleUserAnswer = {props.handleUserAnswer}
            />
        )
    })

    return (
        <div className={props.showModal ? "main-content container hide" : "main-content container"}>
            <div className="questions-placeholder">
                {questions}
            </div>
            <div className="main-button-placeholder">
                {!props.isGameStarted && <p className="score">{props.scoreCount > 7 && "Awesome! "}You scored {props.scoreCount}/10 correct answers</p>}
                <button className="main-btn btn" onClick={(e) => {
                    if (e.target.textContent === "Check answers") {
                        props.handleCheckAnswers()
                    } else {
                        props.handleStartBtn()
                    }
                    
                }}>{props.isGameStarted ? "Check answers" : "Play Again"}</button>
            </div>
        </div>
    )
}