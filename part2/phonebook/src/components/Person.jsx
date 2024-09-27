const Person = ({persons, deletePerson}) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.name}>
          <div>
            {person.name}: {person.number} 
            <button onClick={() => deletePerson(person.id)}>Delete</button>
            </div>
        </div>
      ))}
    </>
  )
}

export default Person