    
const express = require('express');

const router = express.Router()

const coursesController = require('../controllers/courses.controller');
const validationSchema = require('../middlewares/validation-schema');
const userRoles = require('../utils/user-roles');
const verifyToken = require('../middlewares/verifyToken');
const allawedTo = require('../middlewares/allawedTo');


    router.route('/')
    .get( coursesController.getAllCourses)
    .post(verifyToken,  validationSchema() ,  coursesController.addCourse)

    router.route('/:courseId')
    .get(coursesController.getSingleCourse)
    .patch(coursesController.updateCourse)
    .delete(verifyToken , allawedTo(userRoles.ADMIN , userRoles.MANGER) ,  coursesController.deleteCourse );


    module.exports = router;