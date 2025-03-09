let eList = require('../data/emails.json')
//import file system module

const fs = require('fs')    

// include navigation

let navigation = require("../data/navigation.json")

exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', { csrf : 'supersecret'  })
}

exports.newsletterSignupProcess = (req,res) => {

    res.render('newsletter-signup', {csrf : 'supersecret'} )

    console.log(req.body)

    let user = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email
    }

    eList.users.push(req.body)

    console.log(eList)

    let json = JSON.stringify(eList)

    fs.writeFileSync('./data/emails.json',json,'utf-8', ()=>{})



    res.redirect(303,'/newsletter/list')

}

exports.newsletterSignupList = (req,res) => {

    let eList = require('../data/emails.json')

    console.log(eList)
    res.render('userspage',{"users":eList.users, nav:navigation})
    
}


exports.newsletterUser = (req,res) =>{

    console.log(eList)
    let userDetails = eList.users.filter((user)=>{

        return user.email == req.params.email

    })

    console.log(userDetails)
    res.render('userdetails',{"users": userDetails, nav:navigation})

}

exports.newsletterUserDelete = (req, res) => {

    let newsList = {}
// retrieve all users filtering out the email we dont want , hence the !=

    newsList.users = eList.users.filter((user)=>{

        return user.email != req.params.email

    })

    console.log("deleting" + req.params.email)
// converting object to a string 
    let json = JSON.stringify(newsList)

    fs.writeFileSync('./data/emails.json',json,'utf-8', ()=>{})

   // add delete caches here 

    res.redirect(303, '/newsletter/list')


}