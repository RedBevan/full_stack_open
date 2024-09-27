import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'

const Person = ({persons}) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.name}>
          <div>{person.name}: {person.number}</div>
        </div>
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    phonebookService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const nameExists = (possibleNewName) => {

    // create array of names in lower case
    let personsLower = persons.map((person) => person.name.toLowerCase())

    // Create new var of new name in lower case
    let possibleNewNameLower = possibleNewName.toLowerCase()

    // check if lower case array contains lower case name
    return personsLower.some(person => person === possibleNewNameLower);
  }; 
  
  const addName = (event) => {
    event.preventDefault()
    
    // if (nameExists(newName)) {
    //   alert('This name is already in the phonebook');
    //   setNewName('')
    //   return;
    // }

    const personObject = { name: newName, number: newNumber };

    setPersons(prevPersons => [...prevPersons, personObject]);

    console.log(`PERSONS`, persons);

    console.log(personObject)

    phonebookService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const logPersons = () => {
    console.log(persons)
    let namesArr = persons.map(person => person.name)
    console.log(namesArr)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>

        <div>
          number:
          <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Person persons={persons}/>
      <button onClick={logPersons}>log persons</button>
    </div>
  )
}

export default App