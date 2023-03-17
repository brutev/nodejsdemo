const express = require('express')
const https = require("https");
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const database = require('./queries')
const fs = require("fs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true})
)
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  };
app.get('/', (request, response) => {
    response.redirect({ 'https://': 'Node.js, Express, and Postgres API' })
})
app.get('/users', database.getUsers)
app.get('/users/:id', database.getUserById)
app.post('/users', database.createUser)
app.put('/users/:id', database.updateUser)
app.delete('/users/:id', database.deleteUser)

https.createServer(options, app)
.listen(3000, function (req, res) {
  console.log("Server started at port 3000");
});