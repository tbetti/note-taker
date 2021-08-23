const express = require('express');
const router = express.Router();
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

// Create a new note
router.post('/', (req, res) => {
    const newNote = {
        id: uuid.v4().substr(0, 3),
        title: req.body.title,
        text: req.body.text
    }
    if (newNote.title && newNote.text) {
        notes.push(newNote);
        res.json(notes);
    } else {
        res.status(400).json({ msg: 'Include title and text' });
    }
});

module.exports = router;