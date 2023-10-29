const fs = require('fs')

let fetch_notes = async () => {
    try {
        let data = await fs.promises.readFile('notes.txt', 'utf8')
        let notes = await JSON.parse(data)
        return notes
    } catch (error) {
        console.log(error)
        return []
    }
}

let add_note = async (title, text) => {
    let notes =  await fetch_notes()

    let note = {
        title,
        text
    }

    dublicate = await notes.filter((note) => note.title === title)
    if (dublicate.length === 0) {
        await notes.push(note)

        try {
            fs.writeFile('notes.txt', JSON.stringify(notes), (err, data) => { if (err) {throw err} })
        } catch (error) {
            console.log(error)
        };
    
        show_one_note(note)
    } else {
        console.log("\x1b[31m", 'ERROR: Note with this title already exist', "\x1b[0m")
    }
}

let remove_note = async (title) => {
    let notes =  await fetch_notes()
    let filtered_notes = await notes.filter((note) => note.title !== title)

    if (notes.length === filtered_notes.length) {
        console.log("\x1b[31m", `ERROR: There is no file with title(${title})`, "\x1b[0m")
        return false
    } else {
        try {
            fs.writeFileSync('notes.txt', JSON.stringify(filtered_notes))
        } catch (error) {
            console.log(error)
        } return true
    }
}

let read_note = async (title) => {
    let notes =  await fetch_notes()
    let filtered_notes = await notes.filter((note) => note.title === title)

    if (filtered_notes.length === 0) {
        console.log("\x1b[31m", `ERROR: There is no file with title(${title})`, "\x1b[0m")
    } else {
        show_one_note(filtered_notes[0])
    }
}

let show_one_note = (note) => {
    console.log(`----------------------\nTitle: ${note.title}\nText: ${note.text}`)
}

let get_all_notes = async () => {
    let notes =  await fetch_notes()

    notes.forEach(note => {
        show_one_note(note)
    });
}

let edit = async (title, text) => {
    if (await remove_note(title)) {
        await add_note(title, text)
    }
}


module.exports = {
    add_note,
    remove_note,
    read_note,
    get_all_notes,
    edit
}