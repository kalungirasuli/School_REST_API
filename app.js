const express= require('express');
const app = express();
const port = 3000;
const router=express.Router();


//middleware
app.use(express.json());//the body of the request is json
app.use(express.urlencoded({extended:true}));



// define a route handler for the default home page
const tryRoute=require('./routes/try.js');





//this is the routes for trial
app.use('/',tryRoute);

//this is the listener of the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));