const express = require('express')
const router = express.Router()

const { createDatabase } = require('../controllers/dbController')

router.route('/').get(createDatabase)

module.exports = router