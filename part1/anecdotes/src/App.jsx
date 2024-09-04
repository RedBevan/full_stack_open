import { useState } from 'react'

const Heading = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Anecdote = (props) => {
  console.log(props)
  return (
    <>
    <div>
        <p>{props.anecdote}</p>
      </div>
      <div>
        <p>Has {props.index} votes</p>
      </div>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState({
    0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0
  })

  const [mostPopular, setMostPopular] = useState()

  let started = false

  const start = () => {
    started = true
  }

  const generateRandomNumber = () => {
    let numOfAnecdotes = anecdotes.length
    return ( Math.floor(Math.random()*numOfAnecdotes)
    )
}

  const selectAnecdote = () => {
    let anecdoteNumber = generateRandomNumber()
    setSelected(anecdoteNumber)
  }

  const vote = () => {
    let anecdoteNumber = selected
    let copyPoints = {...points}
    copyPoints[anecdoteNumber] +=1
    setPoints(copyPoints)
    findMostPopular(copyPoints)
  }

  const findMostPopular = (updatedPoints) => {
    let pointsArray = Object.values(updatedPoints)
    let highestPoints = Math.max(...pointsArray)
    let highestPointsIndex = (pointsArray.indexOf(highestPoints))
    setMostPopular(highestPointsIndex)
  }

  return (
    <>
    <Heading text='Anecdote of the day' />
    <Anecdote anecdote={anecdotes[selected]} index={points[selected]} />
    <Button onClick={selectAnecdote} text='New anecdote' />
    <Button onClick={vote} text='Vote' />
    <div>
      <Heading text='Anecdote with most votes' />
      <Anecdote anecdote = {anecdotes[mostPopular]} index={points[mostPopular]} />
    </div>
    </>
  )
}

export default App