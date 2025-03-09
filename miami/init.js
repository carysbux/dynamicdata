//arrays
// Numeric 
let numbers = [10,12,13,14,13,56]
// strings 
let names = [ "Peter","Jack","Mary","Claudia"]
//Access values of an array
console.log(names[3])
//array iteration
names.forEach( (value,index)=>{
    //Inside item
    console.log(value,index)
    if(value == "Mary") {
        console.log("Found Mary in posistion  " + index )
    }
 })
 // JavaScript Objects
let person = {
    firstName:"William", // person.firstName
    lastName:"Jattin",
    occupation:"Lecturer",
    email:"email@email.com",
    getName: ()=>{
        console.log("My name is " + this.firstName)
    }
}

console.log(person.firstName)
//JSON Does not store functions. Only key values

let data = {
    brand: {
        name: "Miami Travel Site", // data.brand.name
        link: "/",
        img:"/images/logo.png"
    },
    links: [
        {
            text:"Home",
            href:"/"
        },
        {
            text:"Nightlife",
            href:"/nightlife"
        },
        {
            text:"Beaches",
            href:"/beaches"
        },
        {
            text:"About",
            href:"/about"
        }
    ]
}