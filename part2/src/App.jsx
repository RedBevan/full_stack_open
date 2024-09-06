const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key = {part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({course}) => {
  console.log(course)
  const totalOfExercises = course.parts.reduce((total, part) => {
    console.log(part)
    return total += part.exercises;
  }, 0)
  return (
      <div>
        <strong>Total of {totalOfExercises} exercises</strong>
      </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App