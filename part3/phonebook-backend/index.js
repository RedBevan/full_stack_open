const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :body'));

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Phonebook entries</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const numPersons = persons.length;
  const now = new Date();

  response.send(`<p>The phonebook has information for ${numPersons} people.</p>
  <p>${now}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.statusMessage = 'No such person';
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  // const maxId = persons.length > 0
  //   ? Math.max(...persons.map(n => Number(n.id)))
  //   : 0
  // return String(maxId + 1)

  const bigNum = Math.random() * 1000000
  
  return String(bigNum)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  const nameExists = persons.find(person => person.name === body.name);
  const numExists = persons.find(person => person.number === body.number)

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (nameExists || numExists) {
    return response.status(400).json({
      error: 'name already in phonebook'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})