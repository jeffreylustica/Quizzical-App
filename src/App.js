import React, {useState, useEffect} from "react"
import Intro from './components/Intro'
import Main from './components/Main'
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchData, setFetchData] = useState(0)
  const [showModal, setShowModal] = useState(true)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [quizzes, setQuizzes] = useState([])
  const [scoreCount, setScoreCount] = useState(0)

  function startQuiz() {
    document.documentElement.scrollTop = 0
    setShowModal(false)
    setIsGameStarted(true)
    setFetchData(prevData => prevData + 1)
    setScoreCount(0)
  }

  useEffect(() => {
    async function getQuizzes() {
      setIsLoading(true)
      const res = await fetch('https://opentdb.com/api.php?amount=5&encode=url3986')
      const data = await res.json()
      const quizData = data.results.map(data => {
        const choicesArr = [{id: nanoid(), option: data.correct_answer, isSelected: false, isCorrect: true}]
        data.incorrect_answers.forEach(incorrectAns => {
            choicesArr.push({id: nanoid(), option: incorrectAns, isSelected: false, isCorrect: false})
        })
        choicesArr.sort(function(a, b){return 0.5 - Math.random()})

        return {id: nanoid(), question: data.question, correct_answer: data.correct_answer, incorrect_answers: data.incorrect_answers, shuffled_choices: choicesArr}
      })
      setIsLoading(false)
      setQuizzes(quizData)     
    }
    getQuizzes()
  }, [fetchData])

  function getUserAnswer(question, answer) {
    setQuizzes(prevData => {
      return prevData.map(data => {
        if (data.question === question) {
          const updatedChoices = data.shuffled_choices.map(dataOption => {
            return dataOption.option === answer ? {...dataOption, isSelected: true} : {...dataOption, isSelected: false}
          })
          return {...data, shuffled_choices: updatedChoices}
        } else {
          return data
        }
      })
    })
  }

  function checkAnswers() {
    quizzes.forEach(quiz => {
      quiz.shuffled_choices.forEach(choice => {
        if (choice.isSelected && choice.option === quiz.correct_answer) {
          setScoreCount(prevCount => prevCount + 1)
        }
      })
    })
    setIsGameStarted(false)
  }

  return (
    <div className="main-body">
      {scoreCount > 1 && <Confetti height={1100}/>}
      <Intro 
        showModal = {showModal}
        handleStartBtn = {startQuiz}
      />
      {isLoading ? <div className="loading">Loading...</div> : 
      <Main 
      showModal = {showModal}
      isGameStarted = {isGameStarted}
      quizzes = {quizzes}
      scoreCount = {scoreCount}
      handleStartBtn = {startQuiz}
      handleUserAnswer = {getUserAnswer}
      handleCheckAnswers = {checkAnswers}
      />}
      
    </div>
  )
}