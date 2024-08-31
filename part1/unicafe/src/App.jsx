import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Stats = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.text}: {props.value}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    console.log('good!')
    console.log('all', all)
    setGood(() => good + 1)
    let newAll = all + 1
    setAll(() => newAll)
    let newScore = score + 1
    setScore(newScore)
    console.log('all', all)
    calculateAverage(newScore, newAll)
  }
  
  const handleNeutralClick = () => {
    console.log('meh!')
    setNeutral(() => neutral + 1)
    let newAll = all + 1
    setAll(() => newAll)
    let newScore = score
    setScore(newScore)
    calculateAverage(newScore, newAll)
  }
  
  const handleBadClick = () => {
    console.log('bad!')
    setBad(() => bad + 1)
    let newAll = all + 1
    setAll(() => newAll)
    let newScore = score - 1
    setScore(newScore)
    console.log('all', all)
    calculateAverage(newScore, newAll)
  }

  const calculateAverage = (sum, divisor) => {
    console.log('Average!')
    setAverage(sum/divisor)
  }

  return (
    <div>
      <Header text='Give feedback' />
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <Header text='Statistics' />
      <Stats text='Good' value={good} />
      <Stats text='Neutral' value={neutral}/>
      <Stats text='Bad' value={bad}/>
      <Stats text='All' value={all} />
      <Stats text='Score' value={score} />
      <Stats text='Average' value={average} />
    </div>
  )
}

export default App