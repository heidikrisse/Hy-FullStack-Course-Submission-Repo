const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    <Part part={parts[0].part} exercises={parts[0].exercises} />
    <Part part={parts[1].part} exercises={parts[1].exercises} />
    <Part part={parts[2].part} exercises={parts[2].exercises} />
  </div>
)

const Total = ({ total }) => <p>Number of exercises {total}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [
    { part: part1, exercises: exercises1 },
    { part: part2, exercises: exercises2 },
    { part: part3, exercises: exercises3 },
  ]
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  )
}

export default App
