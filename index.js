require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const connectDB = require('./config/db')


connectDB()

const port = 3000

const app = express()

app.use(express.json());

require('./routes/user.routes')(app)
require('./routes/post.routes')(app)
require('./routes/categories.routes')(app)

app.get('/', (req, res) => res.send('Hello sandip!'))


app.listen(port, () => console.log(`Blog app listening on port ${port}!`))