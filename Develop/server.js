// Server side
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: false }));

app.get('/api/notes', (req, res) =>{
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));