const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {urlencoded,json} = require('body-parser');
const BlogRoute = require('./api/routes/blog');
const categoryRoute = require('./api/routes/category');
const authRoute = require('./api/routes/auth');
const commentRoute = require('./api/routes/comment')

const cors = require('cors');
mongoose.connect('mongodb+srv://aditinaik861:Namaste123@blog.7qhyyys.mongodb.net/?retryWrites=true&w=majority&appName=blog')
mongoose.connection.on('connected',()=>{
    console.log("Connected with Database")
})

mongoose.connection.on('error',(err)=>{
    console.log("Connection Failed");
    console.log(err)
});

// app.use(fileUpload({
//   useTempFiles:true
// }))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(cors())

app.use('/blog',BlogRoute);
app.use('/category',categoryRoute);
app.use('/auth',authRoute)
app.use('/comment',commentRoute)

app.use((req,res)=>{
    res.status(200)
    .json({
        msg:"Bad Request"
    })
})

module.exports = app;