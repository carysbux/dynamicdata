const http = require('http');
// node module named http 

const fs = require('fs');

const hostname = '127.0.0.1'; // specifying IP address in quotes as is it has dots 
const port = 8080;

const someName = (name)=>{
    console.log('your name is:' + name)

}

someName('Carys')

// read files and display them
const displayPage = (path, r, status = 200)=> {

  r.setHeader('Content-Type', 'text/html');
  // render file with code instead of showing bare code 

  fs.readFile(path,(error,content)=>{

    if(error){
      r.statusCode = 500;
      r.end("500 - error")
    } else{
    
    r.statusCode = status;
    r.end(content);
    }

  });
}

const server = http.createServer((req, res) => {

  console.log(req.url);

  switch (req.url) {
    
    case "":
    case "/":
    // response 
    displayPage('./public/home.html', res) 
    break; 

    case "/about":
      // response 
      displayPage('./public/about.html', res) 
      break; 

    case "/contact":
    // response 
    displayPage('./public/contact.html', res) 
    break; 

    default:
      // response 
      displayPage('./public/404.html',res,404) 
    
  } 
  
});

server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});