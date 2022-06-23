import React from "react"

export default function Question() {
    return (
        <div className="question-container">
            <p className="question">How would one say goodbye in Spanish?</p>
            <div className="answer-choices">
                <button className="answer-btn">answer1</button>
                <button className="answer-btn">answer2</button>
                <button className="answer-btn">answer3</button>
                <button className="answer-btn">answer4</button>
            </div>
        </div>
    )
}