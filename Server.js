const express = require('express');
const hbs = require('hbs');   // handle bars

var app = express();
app.set('view engine', 'hbs');   //setting view engine to handle bars

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.send({
        name: 'Snapnab',
        age: 4
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {         //rendering the about.hbs file in the views folder
        titlePage: 'Title Page',
        currentYear: new Date().getFullYear()     //getting the current date and using it in the template string placed in the about.hbs
    });
});

app.get('/bad', (req, res) => {
    res.send('Bad request - Error');
});

app.listen(3000, () => {
    console.log('Server is up at port 3000');
});