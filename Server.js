const express = require('express');
const hbs = require('hbs');   // handle bars

var app = express();
app.set('view engine', 'hbs');   //setting view engine to handle bars
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        titlePage : 'Home Page'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {         //rendering the about.hbs file in the views folder
        titlePage: 'Title Page'
    });
});

app.get('/bad', (req, res) => {
    res.send('Bad request - Error');
});

app.listen(3000, () => {
    console.log('Server is up at port 3000');
});