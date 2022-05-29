const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({path: "./config.env"});
require("./db/conn");

// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


// We link the router files to make our route easy
app.use(require("./router/auth"));

// 2. step heroku
let PORT = process.env.PORT || 5000;

// 3: step heroku

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}
app.listen(PORT,function(){
    console.log("Server started at port 5000.");
});


 

