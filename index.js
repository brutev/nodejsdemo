const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const database = require('./queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true})
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users', database.getUsers)
app.get('/users/:id', database.getUserById)
app.post('/users', database.createUser)
app.put('/users/:id', database.updateUser)
app.delete('/users/:id', database.deleteUser)

app.listen(process.env.PORT || port, () => {
    console.log(`App running on port ${port}.`)
})