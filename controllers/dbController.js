const asyncHandler = require('express-async-handler')
const pool = require('../db')

createDatabase = asyncHandler(async (req, res) => {
    await pool.query("CREATE TABLE notes ( id SERIAL PRIMARY KEY, title VARCHAR(100), text TEXT)")
    res.status(200).json({message: 'Table was created!'})
})

module.exports = {
    createDatabase
}