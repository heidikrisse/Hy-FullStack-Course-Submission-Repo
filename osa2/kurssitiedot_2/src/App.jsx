const Total = ({ total }) => {
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  )
}

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => {
    console.log("current sum of exercises:", sum, "\n+ part exercises:", part.exercises, "\n=")
    return sum + part.exercises
  }, 0)

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  )
}

const Header = ({ courseName }) => <h2>{courseName}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    ))}
  </div>
)

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
)

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        { name: "Fundamentals of React", exercises: 10, id: 1 },
        { name: "Using props to pass data", exercises: 7, id: 2 },
        { name: "State of a component", exercises: 14, id: 3 },
        { name: "Redux", exercises: 11, id: 4 },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        { name: "Routing", exercises: 3, id: 1 },
        { name: "Middlewares", exercises: 7, id: 2 },
      ],
    },
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App