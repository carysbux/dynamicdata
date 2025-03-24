const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// static routes
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: true }));

// template engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

// load data
const navigation = require('./data/navigation.json');
const slideshow = require('./data/slideshow.json');
const gallery = require('./data/gallery.json');
const content = require('./data/pages.json');
const plants = require('./data/plants.json');

// dynamic routes
app.get('/', (req, res) => {
    const slides = slideshow.slides.filter(slide => slide.home === true);
    res.type("text/html");
    res.render("page", { 
        title: "Starter Garden", 
        nav: navigation,
        slides: slides,
        images: gallery.images 
    });
});


app.get('/page/:page', (req, res) => {
    const page = content.pages.find(item => item.page === req.params.page);
    if (!page) {
        return res.status(404).send('Page not found');
    }

    const slides = slideshow.slides.filter(slide => slide.page === req.params.page);
    const pagePlants = plants.plants.filter(plant => plant.page === req.params.page);

    res.type("text/html");
    res.render("page", { 
        title: page.title, 
        description: page.description,
        plants: pagePlants,
        nav: navigation,
        slides: slides,
        images: gallery.images 
    });
});

// Error handling
app.use((req, res) => {
    res.type("text/html");
    res.status(404);
    res.send("404 not found");
});

app.use((error, req, res, next) => {
    console.log(error);
    res.type("text/html");
    res.status(500);
    res.send("500 server error");
});

// start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Press Ctrl-C to terminate.`);
});
// start server
