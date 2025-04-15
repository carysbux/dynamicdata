
// add body parser

const bodyParser = require('body-parser');

// sequelize instance 
const { Sequelize, Model, DataTypes }= require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// define the model

const ProfileImage = sequelize.define('ProfileImages', {
    url: DataTypes.STRING,
});

// parsing request body

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//sync models with databse

sequelize.sync();

//upload the post route (res.send('uploaded!))

const image = await ProfileImage({'url' :req.file.path});
res.json(image);

//CRUD routes for Images model

app.get('/images', async (req, res) => {
    const image = await ProfileImage.findAll();
    res.json(image);
});

app.get('/image/:id', async (req, res) => {
    const image = await ProfileImage.findByPk(req.params.id)
    res.json(image)});

app.get('/image/:id', async (req, res) => {
    const image = await ProfileImage.findByPk(req.params.id)
    image.destroy()
    res.json(image)});