
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const httpStatusText = require('./utils/httpStatusText')
const path = require('path')
const app = express();








const mongoose = require('mongoose');
// const multer = require('multer');

// const storageFile = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {

//       cb(null, file.originalname)
//     }
//   })

//   const upload = multer({storage : storageFile})


const url = process.env.MONGO_URL

mongoose.connect(url ).then(() => {
    console.log('MongoDB Connected Successfully');
    
})
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const coursesRouter = require('./routes/courses-route')
const userRouter = require('./routes/users-route');

// app.post('/api/upload' , upload.single('avatar'), (req , res) => {
//     res.json(req.file)
    
// })

app.use('/api/courses', coursesRouter) // /api/courses
app.use('/api/users' ,  userRouter)    // /api/users

app.all('*' , (req , res , next) => {
    return res.status(404).json({status : httpStatusText.ERROR , msg: "route not found"})
})


app.use((error , req , res, next ) => {
    return res.status(error.statusCode || 500).json({status : error.statusText || httpStatusText.ERROR , msg : error.message , code : error.statusCode || 500 , data : null})
})


app.listen(process.env.PORT || 5000 , () => {
    console.log('Listening on port 5000');
    
})