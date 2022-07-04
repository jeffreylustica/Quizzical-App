import React from "react"

export default function Intro(props) {

    return (
        <div className={props.showModal ? "intro-overlay" : "intro-overlay clicked"}>
            <div className="page-circle-1"></div>
            <div className="page-circle-2"></div>
            <div className="intro">
                <h1 className="intro-title">Quizzical</h1>
                <p className="intro-desc">Some description if needed</p>
                <button className="intro-btn btn" onClick={props.handleStartBtn}>Start quiz</button>
            </div>
        </div>
    )
}