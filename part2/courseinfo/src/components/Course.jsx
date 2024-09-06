const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

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
  const numOfExercises = course.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0)
  return (
      <div>
        <strong>Total of {numOfExercises} exercises</strong>
      </div>
  )
}

export default Course