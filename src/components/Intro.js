import React from "react"

export default function Intro() {
    return (
        <div className="intro-overlay">
            <div className="intro">
                <h1 className="intro-title">Quizzical</h1>
                <p className="intro-desc">Some description if needed</p>
                <button className="intro-btn btn">Start quiz</button>
            </div>
        </div>
    )
}