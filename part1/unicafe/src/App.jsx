import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const StatisticsLine = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.text}: {props.value}</p>
    </div>
  )
}

const Statistics = ({ good, neutral, bad, all, average, percentPositive }) => {
  if (all === 0) {
    return <p>
      No feedback given
    </p>
  }
  return (
    <div>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="All" value={all} />
      <StatisticsLine text="Average" value={average} />
      <StatisticsLine text="Positive" value={percentPositive} />
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
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
  const [percentPositive, setPercentPositive] = useState(0)

  const handleGoodClick = () => {
    console.log('good!')
    console.log('all', all)
    let newGood = good + 1
    setGood(() => newGood)
    let newAll = all + 1
    setAll(() => newAll)
    let newScore = score + 1
    setScore(newScore)
    console.log('all', all)
    calculateAverage(newScore, newAll)
    let percentPositive = calculatePercentage(newGood, newAll)
    setPercentPositive(percentPositive)
  }
  
  const handleNeutralClick = () => {
    console.log('meh!')
    setNeutral(() => neutral + 1)
    let newAll = all + 1
    setAll(() => newAll)
    let newScore = score
    setScore(newScore)
    calculateAverage(newScore, newAll)
    let percentPositive = calculatePercentage(good, newAll)
    setPercentPositive(percentPositive)
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
    let percentPositive = calculatePercentage(good, newAll)
    setPercentPositive(percentPositive)
  }

  const calculateAverage = (sum, divisor) => {
    console.log('Average!')
    setAverage(sum/divisor)
  }

  const calculatePercentage = (value, totalValue) => {
    return (value/totalValue)*100
  }

  return (
    <div>
      <Header text='Give feedback' />
      <Button text='Good' onClick={handleGoodClick} />
      <Button text='Neutral' onClick={handleNeutralClick} />
      <Button text='Bad' onClick={handleBadClick} />
      <Header text='Statistics' />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        percentPositive={percentPositive}
      />
    </div>
  )
}

export default App