import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'
import Notification from './Notification'

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
  const [notification, setNotification] = useState({ message: null, isSuccess: true })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setNotification({
          message: "Failed to fetch data from server",
          isSuccess: false
        })
        setTimeout(() => setNotification({ message: null }), 3000)
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
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({ message: `Deleted ${name}`, isSuccess: true })
          setTimeout(() => setNotification({ message: null }), 3000)
        })
        .catch(error => {
          setNotification({
            message: `Information of ${name} has already been removed from server`,
            isSuccess: false
          })
          setTimeout(() => setNotification({ message: null }), 3000)
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
            setNotification({ message: `Updated ${updatedPerson.name}'s number`, isSuccess: true })
            setTimeout(() => setNotification({ message: null }), 3000)
          })
          .catch(error => {
            setNotification({
              message: `Information of ${newName} has already been removed from server`,
              isSuccess: false
            })
            setPersons(persons.filter(person => person.id !== personExists.id))
            setTimeout(() => setNotification({ message: null }), 3000)
          })
      }
    } else {
      personService.create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNotification({ message: `Added ${addedPerson.name}`, isSuccess: true })
          setTimeout(() => setNotification({ message: null }), 3000)
        })
        .catch(error => {
          setNotification({
            message: `Failed to add ${newName}`,
            isSuccess: false
          })
          setTimeout(() => setNotification({ message: null }), 3000)
        })
    }
  }    

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification message={notification.message} isSuccess={notification.isSuccess} />

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
