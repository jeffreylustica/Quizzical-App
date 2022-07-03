import React, {useState, useEffect} from "react"
import Intro from './components/Intro'
import Main from './components/Main'

export default function App() {
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
      const res = await fetch('https://opentdb.com/api.php?amount=10')
      const data = await res.json()
      const quizData = data.results.map(data => {
        const choicesArr = [{option: data.correct_answer, isSelected: false, isCorrect: true}]
        data.incorrect_answers.forEach(incorrectAns => {
            choicesArr.push({option: incorrectAns, isSelected: false, isCorrect: false})
        })
        choicesArr.sort(function(a, b){return 0.5 - Math.random()})

        return {question: data.question, correct_answer: data.correct_answer, incorrect_answers: data.incorrect_answers, shuffled_choices: choicesArr}
      })
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
      <Intro 
        showModal = {showModal}
        handleStartBtn = {startQuiz}
      />
      <Main 
        showModal = {showModal}
        isGameStarted = {isGameStarted}
        quizzes = {quizzes}
        scoreCount = {scoreCount}
        handleStartBtn = {startQuiz}
        handleUserAnswer = {getUserAnswer}
        handleCheckAnswers = {checkAnswers}
      />
    </div>
  )
}