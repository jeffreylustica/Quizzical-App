import React from "react"
import Question from "./Question"

export default function Main(props) {  
    const questions = props.quizzes.map((quiz) => {
        const {id, question, correct_answer, shuffled_choices} = quiz
        return (
            <Question 
                key= {id}
                question = {question}
                choicesArr = {shuffled_choices}
                correct_answer = {correct_answer}
                handleUserAnswer = {props.handleUserAnswer}
                isGameStarted = {props.isGameStarted}
            />
        )
    })

    return (
        <div className="circle-wrapper">
            <div className="page-circle-1"></div>
            <div className="page-circle-2"></div>
            <div className={props.showModal ? "main-content container hide" : "main-content container"}>
                <div className="questions-placeholder">
                    {questions}
                </div>
                <div className="main-button-placeholder">
                    {!props.isGameStarted && <p className="score">{props.scoreCount > 1 && "Awesome! "}You scored {props.scoreCount}/5 correct answers</p>}
                    <button className="main-btn btn" onClick={(e) => {
                        e.target.textContent === "Check answers" ? props.handleCheckAnswers() :
                        props.handleStartBtn()                   
                    }}>{props.isGameStarted ? "Check answers" : "Play Again"}</button>
                </div>
            </div>
        </div>
    )
}