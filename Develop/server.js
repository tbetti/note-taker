// Server side
// Call in packages
const express = require('express');
const path = require('path');
const uuid = require('uuid');
const app = express();
const notes = require('./db/db.json');

// Initialize middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

// Return db.json when at /api/notes
// Return all notes
app.get('/api/notes', (req, res) =>{
  console.log(notes);
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

// Create a new note
app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuid.v4().substr(0,3),
    title: req.body.title,
    text: req.body.text
  }
  if(newNote.title && newNote.text){
    notes.push(newNote);
    res.json(notes);
  }else{
    res.status(400).json( { msg: 'Include title and text' } );
  }
})

// Return nodes.html when /notes called
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Return index.html whenever anything else is called
// Must stay at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));