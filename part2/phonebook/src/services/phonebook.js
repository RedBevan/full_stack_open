import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// // Check for a name
// const compare = (possibleName) => {
//   const possibleNameLower = possibleName.toLowerCase();
//   console.log(possibleNameLower)

//   getAll()
//     .then((response) => {
//       // create array of names from server in lower case
//       const lowerCaseNames = response.data.map((person) => person.name.toLowerCase());
//       console.log(lowerCaseNames);

//       // Return the result of checking if possibleName exists in lowerCaseNames
//       return lowerCaseNames.some((name) => name === possibleNameLower);
//     })
//     .then((exists) => {
//       if (exists) {
//         console.log('true')
//         return true;
//       } else {
//         console.log('false')
//         return false;
//       }
//     })
//     .catch((error) => {
//       console.log("Error fetching data", error)
//     })
// }; 

export default { getAll, create, update, deleteItem }