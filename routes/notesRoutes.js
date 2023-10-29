const express = require('express')
const router = express.Router()

const { getNotes, createNote, getNoteById, updateNoteById, deleteNoteById } = require('../controllers/noteController')

router.route('/').get(getNotes).post(createNote)
router.route('/:id').get(getNoteById).put(updateNoteById).delete(deleteNoteById)



module.exports = router