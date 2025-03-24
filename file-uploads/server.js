// initialize express

const express = require('express')

const app = express()


const multer = require('multer')

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


app.post('/profile', upload.single('avatar'), function (req, res) {
    // req.file is the name of your file in the form above, here 'avatar'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
    console.log(req.file.originalname)
    console.log(req.file.mimetype)
    res.type('text/html')
    res.send('file uploaded!')
});


// possible error handling 
app.use((req, res) => {
    res.type('text/html')
    res.status(404)
    res.send('404')
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