const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

// Middleware for body parsing 
app.use(express.static('public'));
app.use(express.json());

//=======================//
//     API Routes        //
//=======================//

// GET //

app.get('api/notes/:id', (req, res) =>{
  res.json(notes[req.params.id]);
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST //

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let userNote = req.body;
    userNote.id = Math.floor(Math.random() * 5000);
    notes.push(userNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(userNote);
    });
  }); 
});

// DELETE //

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
  
  fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
    res.json({msg: 'note deleted'});
  });
});
});

//=======================//
//     HTML Routes       //
//=======================//

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});   

// //Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

// app listener for PORT
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});


