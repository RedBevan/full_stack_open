import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const handleGoodClick = () => {
  console.log('good!')
}

const handleNeutralClick = () => {
  console.log('meh!')
}

const handleBadClick = () => {
  console.log('bad!')
}

const Stats = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.text}: ?</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='Give feedback' />
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <Header text='Statistics' />
      <Stats text='Good'/>
      <Stats text='Neutral'/>
      <Stats text='Bad'/>
    </div>
  )
}

export default App