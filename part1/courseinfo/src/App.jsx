const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part="Fundamentals of React" exercises="10"/>
      <Part part="Using props to pass data" exercises="7"/>
      <Part part="State of a component" exercises="14"/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
    {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      {props.total}
    </p>
  )
}

const App = () => {
  const course="Half stack application development"
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App