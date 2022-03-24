require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoriesRoute = require('./routes/categories')



const port = 3000

const app = express()

app.use(express.json());


const url = process.env.MONGO_URL
mongoose.connect(url, {useNewUrlParser: true});

var conn = mongoose.connection;

conn.on('connected', function() {
    console.log('database is connected successfully');
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);





app.get('/', (req, res) => res.send('Hello sandip!'))


app.listen(port, () => console.log(`Blog app listening on port ${port}!`))