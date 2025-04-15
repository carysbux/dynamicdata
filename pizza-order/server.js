// initialize express,body parser and multer
const express = require('express')
const app = express()
const multer = require('multer')
const bodyParser = require('body-parser')


//define sequelize models and init database
const { Sequelize , Model, DataTypes } = require('sequelize') 

//create instance

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
})

//define model
const ProfileImage = sequelize.define('ProfileImages', {
  url: DataTypes.STRING,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//sync model

sequelize.sync();



// initialize handblebars
const handblebars = require('express-handlebars')
app.engine('handlebars', handblebars.engine())
app.set('view engine', 'handlebars')

// set server
const port = process.env.PORT || 3000


//upload code multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

// add routes

app.get('/', (req, res) => {
    res.type('text/html')
    res.render('page')
})


app.post('/profile', upload.single('avatar'), async (req, res) =>{
    // req.file is the name of your file in the form above, here 'avatar'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
    console.log(req.file.originalname)
    console.log(req.file.mimetype)
    res.type('text/html')
    //res.send('file uploaded!')

    const img = await ProfileImage.create({
      url: req.file.filename

    })
    res.json(img)
});


//CRUD routes for Images model

app.get('/images', async (req, res) => {
  const image = await ProfileImage.findAll();
  res.json(image);
});

app.get('/image/:id', async (req, res) => {
  const image = await ProfileImage.findByPk(req.params.id)
  res.json(image)});

// delete record

app.get('/image/delete/:id', async (req, res) => {
  const image = await ProfileImage.findByPk(req.params.id)
  image.destroy()
  res.json(image)
});



// possible error handling , not found error
app.use((req, res) => {
    res.type('text/html')
    res.status(404)
    res.send('404')
    res.send('not found')
})

app.use((error,req, res, next) => {
    res.type('text/html')
    res.status(500)
    console.log(error)
    res.send('server error')

})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} press ctrl + c to close`)
})