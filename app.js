const express= require('express');
const app = express();
const router=express.Router();
const mongoose= require('mongoose')


//middleware
app.use(express.json());//the body of the request is json
app.use(express.urlencoded({extended:true}));



// define a route handler for the default home page
const tryRoute=require('./routes/try.js');
const deptRoutes = require('./routes/deptRoutes.js')

mongoose.connect('mongodb+srv://jumajosephat61:techfier@techfierdb.d6qutsb.mongodb.net/school_db', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>{
    console.log('Connected to Database')
})
.catch((err)=>{
    console.error('Error connecting to db')
});



//this is the routes for trial
app.use('/',tryRoute)
app.use('/',deptRoutes)

//this is the listener of the server
app.listen(3000, () => console.log(`app listening on port 3000`));