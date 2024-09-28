import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

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
    console.log(personsLower)

    // Create new var of new name in lower case
    let possibleNewNameLower = possibleNewName.toLowerCase()

    // check if lower case array contains lower case name
    return personsLower.some(person => person === possibleNewNameLower);
  }; 
  
  const addName = (event) => {
    event.preventDefault()

    if (newName === '') {
      alert('No name inputted');
      return;
    }

    if (newNumber === '') {
      alert('No number inputted');
      return;
    }

    if (nameExists(newName)
    && window.confirm(`${newName} is already in the phonebook. Update their number?`)) {

      console.log('UPDATED')
      const person = persons.find(p => p.name === newName)
      console.log(person)

      const changedPerson = { ...person, number: newNumber }

      phonebookService
        .update(person.id, changedPerson)
        .then((response) => {
          console.log(response.data)
          setPersons(persons.map(p => p.id !== person.id ? p : response.data))
        })
        .catch(error => {
          alert('Did not update')
        })

      setNewName('');
      setNewNumber('')
      return;
    }

    const personObject = { name: newName, number: newNumber };

    setPersons(prevPersons => [...prevPersons, personObject]);

    console.log(`PERSONS`, persons);

    console.log(personObject)

    phonebookService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotification(`${newName} added to phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 2000)
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

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (person && window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deleteItem(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification(`${person.name} removed from phonebook`)
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(error => {
          alert(`Failed to delete ${person.name}`)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
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
      <Person 
      persons={persons}
      deletePerson={deletePerson}
      />
    </div>
  )
}

export default App