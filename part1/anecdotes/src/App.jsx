import { useState } from 'react'

const Heading = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
    <div>
        <p>{anecdote}</p>
      </div>
      <div>
        <p>Has {votes} {votes === 1 ? 'vote' : 'votes'}</p>
      </div>
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
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

  const [mostPopular, setMostPopular] = useState(0)

  const generateRandomNumber = (max) => {
    console.log(max)
    return ( Math.floor(Math.random()*max)
    )
  }

  const selectAnecdote = () => {
    let anecdoteNumber = generateRandomNumber(anecdotes.length)
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
    <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
    <Button onClick={selectAnecdote} text='New anecdote' />
    <Button onClick={vote} text='Vote' />
    <div>
      <Heading text='Anecdote with most votes' />
      <Anecdote anecdote = {anecdotes[mostPopular]} votes={points[mostPopular]} />
    </div>
    </>
  )
}

export default App