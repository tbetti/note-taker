// Server side
// Call in packages
const express = require('express');
const path = require('path');
const app = express();

// Initialize middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

// Return nodes.html when /notes called
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Return index.html whenever anything else is called
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Return db.json when at /api/notes
app.get('/api/notes', (req, res) =>{
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));