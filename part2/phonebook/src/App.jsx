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
  }, [persons])
  
  const addName = async (event) => {
    event.preventDefault()

    if (newName === '') {
      alert('No name inputted');
      return;
    }

    if (newNumber === '') {
      alert('No number inputted');
      return;
    }

    // Check if name exists asynchronously
    const nameExists = async (possibleName) => {
      const possibleNameLower = possibleName.toLowerCase();

      try {
        const response = await phonebookService.getAll();

        // create array of names from server in lower case
        const lowerCaseNames = response.data.map((person) => person.name.toLowerCase());

        // Return true if name exists, false if not
        return lowerCaseNames.some((name) => name === possibleNameLower);
      } catch (error) {
        console.log("Error fetching data", error);
        return false;
      }
    };

    console.log(newName);

    // Wait for the result of nameExists
    const doesNameExist = await nameExists(newName);

    console.log(doesNameExist);

    if (doesNameExist && window.confirm(`${newName} is already in the phonebook. Update their number?`)) {
      console.log('UPDATED')

      const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
      console.log(person)

      const changedPerson = { ...person, number: newNumber };

      phonebookService
        .update(person.id, changedPerson)
        .then((response) => {
          console.log(response.data);
          setPersons(persons.map(p => p.id !== person.id ? p : response.data));
          setNotification(`Number for ${newName} updated`);
        setTimeout(() => {
          setNotification(null);
        }, 2000);
        })
        .catch((error) => {
          alert('Did not update');
        });
      setNewName('');
      setNewNumber('');
      return;
    }

    // If name doesn't exist, add new person
    const personObject = { name: newName, number: newNumber };

    setPersons(prevPersons => [...prevPersons, personObject]);

    phonebookService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNotification(`${newName} added to phonebook`);
        setTimeout(() => {
          setNotification(null);
        }, 2000);
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        console.log("Couldn't add person");
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (person && window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deleteItem(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification(`${person.name} removed from phonebook`);
          setTimeout(() => {
            setNotification(null);
          }, 2000);
        })
        .catch(error => {
          alert(`Failed to delete ${person.name}`);
        });
    }
  };

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
  );
};

export default App;
