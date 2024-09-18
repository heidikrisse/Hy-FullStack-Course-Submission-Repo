const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
)

const Content = ({ part1, part2, part3 }) => (
  <div>
    <Part part={part1.parts} exercises={part1.exercises} />
    <Part part={part2.parts} exercises={part2.exercises} />
    <Part part={part3.parts} exercises={part3.exercises} />
  </div>
)

const Total = ({ part1, part2, part3 }) => <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    parts: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    parts: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    parts: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  )
}

export default App
