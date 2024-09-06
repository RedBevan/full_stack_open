import { useState } from 'react'

const Person = ({persons}) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name}
        </div>
      ))}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Fred Flinstone' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('Button clicked!', event.target);
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
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
    </div>
  )
}

export default App