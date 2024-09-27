import { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [persons, setPersons] = useState([
    { 
      name: 'Fred Flinstone',
      number: '00'
    }
  ]) 
  const [newName, setNewName] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log(response.data)
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
    
    if (nameExists(newName)) {
      alert('This name is already in the phonebook');
      setNewName('')
      return;
    }

    const personObject = { name: newName };

    setPersons(prevPersons => [...prevPersons, personObject]);

    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
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