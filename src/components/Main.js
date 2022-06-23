import React from "react"
import Question from "./Question"

export default function Main() {
    return (
        <div className="main-content container">
            <div className="questions-placeholder">
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
            </div>
            <div className="main-button-placeholder">
                <p className="score">You scored 3/5 correct answers</p>
                <button className="main-btn btn">Check answers</button>
            </div>
        </div>
    )
}