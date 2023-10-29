const fs = require('fs')
const yargs = require('yargs')

const notes = require('./notes')

const user_data = yargs.argv

let title = user_data['title']
let text = user_data['text']
let command = user_data._[0]

if (command === 'add') {
    console.log('Adding note')
    notes.add_note(title, text)
} else if (command === 'remove') {
    console.log('Removing note')
    notes.remove_note(title)
} else if (command === 'read') {
    console.log('Reading note')
    notes.read_note(title)
} else if (command === 'edit') {
    console.log('Editing note')
    notes.edit(title, text)
} else if (command === 'list') {
    console.log('Listing all notes')
    notes.get_all_notes()
} else {
    console.log('Unknown command was used!')
}