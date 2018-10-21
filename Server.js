const express = require('express');
const hbs = require('hbs');   // handle bars
const fs = require('fs');

//changes to copeup with the deploy on heroku
 var port = process.env.PORT || 3000;


var app = express();
app.set('view engine', 'hbs');   //setting view engine to handle bars
hbs.registerPartials(__dirname + '/views/partials')

//middle ware used to restrict further routing as in the case of maintenance of site and all

// will use it store the time stamp values whenever the user logs in to the server
app.use((req,res,next) => {
    var now = new Date().toString();// toString used it to make the values more readable
    var log = now + ' ' + req.method + ' ' + req.url;

    console.log(log + '\n');
    fs.appendFileSync('server.log', log + '\n', (err) => {
            if (err) {
                console.log('Unable to append to server.log');
            }
        }
    );
    next(); // instructs to proceed then , if not mentioned would stop the program here itself as in the case of maintenance sites -- commented below
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// }); //no next is mentioned so on any further routing it will display the maintenance page only

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// hbs.registerHelper('screamIt', (text) => {
//     return text.toUpperCase(); at the place where the replacement has to be mentioned replace it as {{x}} the {{screamIt x}} :: by giving space we can pass as many arguments as we wish
// });

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

app.listen(port, () => {
    console.log('Server is up at port ' + port);
});