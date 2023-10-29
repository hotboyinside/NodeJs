const asyncHandler = require('express-async-handler')
const pool = require('../db')
// desc get all notes
// route GET /notes
// access public
getNotes = asyncHandler(async (req, res) => {
    const notes = await pool.query('SELECT * FROM notes')
    if (Object.entries(notes.rows).length === 0) {
        res.status(404)
        throw new Error('Notes not found')
    }
    res.status(200).json({ data: notes.rows })
})

// desc create new note
// route POST /notes
// access public
createNote = asyncHandler(async (req, res) => {
    const { title, text } = req.body
    if (!title || !text) {
        res.status(400)
        throw new Error('All fields are mandatory!')
    }
    note = await pool.query('INSERT INTO notes (title, text) VALUES ($1, $2)', [title, text])
    res.status(201).json({ title: title, text: text, message: "was created" })
})

// desc get note by id
// route GET /notes/:id
// access public
getNoteById = asyncHandler(async (req, res) => {
    note = await pool.query('SELECT * from notes WHERE id = $1', [req.params.id])
    console.log(note.rows[0].title)
    if (Object.entries(note.rows).length === 0) {
        res.status(404)
        throw new Error('Note not found')
    }
    res.status(200).json({ data: note.rows })
})

// desc updade note by id
// route PUT /notes/:id
// access public
updateNoteById = asyncHandler(async (req, res) => {
    note = await pool.query('SELECT * from notes WHERE id = $1', [req.params.id])
    if (Object.entries(note.rows).length === 0) {
        res.status(404)
        throw new Error('Note not found')
    }
    const { title, text } = req.body
    if (!title) {title = note.rows[0].title}
    else if (!text) {text = note.rows[0].text}
    else if (!text && !text) {title = note.rows[0].title; text = note.rows[0].text}
    await pool.query('UPDATE notes SET title = $1, text = $2 WHERE id = $3', [title, text, req.params.id])
    res.status(200).json({ message: `Update note for ${req.params.id}!`})
})

// desc delete note
// route DELETE /notes
// access public
deleteNoteById = asyncHandler(async (req, res) => {
    note = await pool.query('SELECT * from notes WHERE id = $1', [req.params.id])
    if (Object.entries(note.rows).length === 0) {
        res.status(404)
        throw new Error('Note not found')
    }
    await pool.query('DELETE FROM notes WHERE id = $1', [req.params.id])
    res.status(200).json({message: `Delete note for ${req.params.id}!`})
})

module.exports = {
    getNotes,
    createNote,
    getNoteById,
    updateNoteById,
    deleteNoteById
}