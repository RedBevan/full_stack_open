import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => {handleClick(props.text)}}>{props.text}</button>
  )
}

const handleClick = (props) => {
  console.log('click', props)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='Give feedback' />
      <Button text='good'/>
      <Button text='neutral'/>
      <Button text='bad'/>
      <Header text='Statistics' />
      <div>more code here</div>
    </div>
  )
}

export default App