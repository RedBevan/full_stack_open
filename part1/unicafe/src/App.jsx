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

  const handleGoodClick = () => {
    console.log('nice!')
    setGood(() => good + 1)
  }
  
  const handleNeutralClick = () => {
    console.log('meh!')
    setNeutral(() => neutral + 1)
  }
  
  const handleBadClick = () => {
    console.log('that's bad!')
    setBad(() => bad + 1)
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
    </div>
  )
}

export default App