const express = require('express');
const router = express.Router();
const fs = require('fs');
const { isBuffer } = require('util');
const uuid = require('uuid');
const notes = require('../db/db.json');

// Return all notes
router.get('/', (req, res) => {
    console.log(notes);
    res.json(notes);
});

// Return single note
router.get('/:id', (req, res) => {
    const found = notes.some(note => note.id === req.params.id);

    if (found) {
        res.json(notes.filter(note => note.id === req.params.id));
    } else {
        res.status(400).json({ msg: `${req.params.id} not found` });
    }
});

// Create a new note and persist data
router.post('/', (req, res) => {
    const newNote = {
        id: uuid.v4().substr(0, 3),
        title: req.body.title,
        text: req.body.text
    }
    if (newNote.title && newNote.text) {
        fs.readFile('./db/db.json', 'utf8', (err, data) =>{
            if(err){
                console.error(err);
            }else{
                // Parse data and push new entry
                const parsedNote = JSON.parse(data);
                parsedNote.push(newNote);
                //Overwrite existing file with new data
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNote, null, ' '),
                    error => error ? console.error(error) : console.info('Data updated!')
                );
            }
        });
        res.json(notes);
    } else {
        res.status(400).json({ msg: 'Include title and text' });
    }
});

// Delete note
router.delete('/:id', (req, res) => {
    const found = notes.some(note => note.id === req.params.id);

    if (found) {
        res.json(notes.filter(note => note.id !== req.params.id));
    } else {
        res.status(400).json({ msg: `${req.params.id} not found` });
    }
});

module.exports = router;