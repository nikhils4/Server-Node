const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send({
        name: 'Snapnab',
        age: 4
    });
});

app.get('/about', (req,res) => {
    res.send('About Page');
});

app.get('/bad', (req, res) => {
    res.send('Bad request - Error');
});

app.listen(3000, () => {
    console.log('Server is up at port 3000');
});