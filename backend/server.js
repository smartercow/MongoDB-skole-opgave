require('dotenv').config()
const express = require('express')
const app = express()
const  mongoose = require('mongoose')
const cors = require('cors')


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Forbundet til database'))

app.use(express.json())
app.use(cors())

const MyUserRoutes = require('./routes/users')
app.use('/', MyUserRoutes)


app.listen(3001, () => console.log('serveren er startet!')
)