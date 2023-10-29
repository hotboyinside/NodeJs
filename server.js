const express = require('express')
const errorHandler = require('./middleware/errorhandler')
const dotenv = require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use('/notes', require('./routes/notesRoutes'))
// app.use(errorHandler)

app.use('/setup', require('./routes/dbRoutes'))

app.listen(port, () => {
    console.log(`Server is staring on port ${port}`)
})
