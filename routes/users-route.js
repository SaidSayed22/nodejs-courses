const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const appError = require('../utils/appError');
// const app = express();


const storageFile = multer.diskStorage({
        destination: function (req, file, cb) {                
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
                const ext = file.mimetype.split('/')[1]
                const filename = `user-${Date.now()}.${ext}`;
                cb(null, filename);
        }
    });

    const fileFilter = (req , file , cb) => {
                const imageType  = file.mimetype.split('/')[0]
                if(imageType === 'image') {
                        return cb(null, true)
                } else {
                        return cb(appError.create('file must be an image' , 400) , false);
                }
    }
    
    const upload = multer({storage: storageFile , fileFilter});
    



 // get all users 
 // register 
 // login

 




    router.route('/')
            .get(verifyToken ,  userController.getAllUsers)

    router.route('/register')
    .post(upload.single('avatar'), userController.register);  // Add multer middleware here

    router.route('/login')
            .post(userController.login)



    module.exports = router;