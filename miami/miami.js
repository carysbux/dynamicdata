
const express = require('express')

const app = express()


//static routing, allows people to access this, pass one folder at a time, declared before routes so it will look for url inside public before the other routes

app.use(express.static('./public'))

// end of static routing


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

//import route handlers
const handler = require('./lib/handler')


//Setup the template engine
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

// To set the port execute: port=8080 node miami  
const port = process.env.PORT || 3000


let navigation = require("./data/navigation.json")

// retrieve slideshow photos 
let slideshow = require("./data/slideshow.json")

//import gallery
let gallery = require('./data/gallery.json')

//import PAGE data
let content = require('./data/pages.json')

//import destination json data 
let destinations = require('./data/destinations.json')

app.get('/', (request,response)=>{
// filtering slideshow objects 
    let slides = slideshow.slides.filter((slide)=>{
        return slide.home == true 
    })

    response.type("text/html")
    response.render("page" , { 
        title:"Miami Travel Site", 
        nav: navigation,
        slides: slides,
        images: gallery.images 
      })
})
// above we only want the homepages marked true in slides 

//dynamic page routes
app.get('/page/:page',(req,res) => {
        // filter pages object to get page from req.params.page

    let page = content.pages.filter((item)=>{
        return item.page == req.params.page 
    })

    console.log(page[0]);

    //filter slideshow to show home only

    let slides = slideshow.slides.filter((slide)=>{
        return slide.page == req.params.page     
    })

    let dest = destinations.locations.filter((loc)=>{
        return loc.page == req.params.page     
    })


    res.type("text/html")
    res.render("page" , { 
        title:page[0].title, 
        description:page[0].description,
        locations: dest,
        nav: navigation,
        slides: slides,
        images: gallery.images 
      })
})


app.get('/beaches', (request,response)=>{
    response.type("text/html")
    response.render("page", {title :"Miami Beaches",nav:navigation})
})

app.get('/nightlife', (request,response)=>{
    response.type("text/html")
    response.render("page",{title:"Miami Night Life",nav:navigation})
})

app.get('/about', (request, response)=>{
    response.type("text/html")
    response.render("page",{title: "About Miami",nav:navigation})
})
// Query, params and body 
app.get('/search', (request, response)=>{
    console.log(request)
    response.type("text/html")
    response.render("page",{title: "Search results for: " + request.query.q,
        nav:navigation
    })
})


// newsletter routes ****
app.get('/newsletter-signup', handler.newsletterSignup)
app.post('/newsletter-signup/process', handler.newsletterSignupProcess)
app.get('/newsletter/list',handler.newsletterSignupList)

//dynamic routes

app.get('/newsletter/detail/:email', handler.newsletterUser)

//delete function

app.get('/nesletter/delete/:/email', handler.newsletterUserDelete)


//error handling goes after the actual routes
//The default response is not found
app.use((request,response) => {
    response.type("text/html")
    response.status(404)
    response.send("404 not found")
})
//Server Error
app.use ( (error, request,response,next)=>{
    console.log(error)
    response.type("text/html")
    response.status(500)
    response.send("500 server error") 
})

//start the server
app.listen(port, ()=> {
    console.log(`Express is running on http://localhost:${port};`)
    console.log(` press Ctrl-C to terminate.`)
})
    


