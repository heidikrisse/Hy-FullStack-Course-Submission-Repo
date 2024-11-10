import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    filter shown with <input value={searchTerm} onChange={handleSearchChange} />
  </div>
)

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ personsToShow, handleDelete }) => (
  <div>
    {personsToShow.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
        <button className="delete-button" onClick={() => handleDelete(person.id, person.name)}>delete</button>
      </div>
    ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.find(person => person.name === newName)
    const newPerson = { name: newName, number: newNumber }

    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personExists.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== personExists.id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService.create(newPerson).then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
