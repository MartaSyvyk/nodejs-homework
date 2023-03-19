// LO0hq9eZJ3wZfzjk
// const DB_HOST = "mongodb+srv://MartaSyvyk:LO0hq9eZJ3wZfzjk@cluster0.zhbnzgf.mongodb.net/?retryWrites=true&w=majority"

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")


// dotenv.config();
// const {DB_HOST} = process.env
// mongoose.connect(DB_HOST)
// .then(() => app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// }))
// .catch(err => {console.log(err.message);
// process.exit(1)});

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} =err;
  res.status(status).json({  status: 'error',
  code: status,
  message: message })
})



module.exports = app
