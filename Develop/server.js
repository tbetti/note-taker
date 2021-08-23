// Server side
// Call in packages
const express = require('express');
const path = require('path');
const app = express();
const notes = require('./routes/notes');

// Initialize middleware
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.static('public')); // Would I put this here or in the notes.js file? Do I need a dirname?

// Return db.json when at /api/notes
app.use('/api/notes', notes);

// Return nodes.html when /notes called
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Return index.html whenever anything else is called
// Must stay at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Listen at PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));