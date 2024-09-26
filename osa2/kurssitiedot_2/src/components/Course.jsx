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
  
  export default Course
  