const { validationResult} = require('express-validator');

const Course = require('../models/course.model')
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');

    const getAllCourses =  asyncWrapper(
        async (req , res) => {

            const query = req.query                
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;
  const courses = await  Course.find({}, {__v : false}).limit(limit).skip(skip);
    res.json({status : httpStatusText.SUCCESS ,data :{courses}})
}
    )

    const getSingleCourse = asyncWrapper(
        async (req , res , next) => {
            const course = await Course.findById(req.params.courseId)
            if(!course) {
               const error =  appError.create('Course not found' , 404 , httpStatusText.FAIL)
                return next(error);
            }
            res.json({ status: httpStatusText.SUCCESS , data: {course}});
    }
    )

    const addCourse = asyncWrapper(
        async (req , res , next) => {

            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                
                const error = appError.create(errors.array() , 400 , httpStatusText.FAIL)
                return next(error)
                // return res.status(400).json({ status: httpStatusText.FAIL , data: errors.array() });
        }
        
         const newCourse =  new Course(req.body)
                
            await newCourse.save()
         res.status(201).json({status: httpStatusText.SUCCESS , data : {course : newCourse}})
    }
    )

    const updateCourse = asyncWrapper(
        async (req ,res) => {
         
            const courseId = req.params.courseId
                    const updatedCourse =   await Course.updateOne({_id: courseId} , {$set: {...req.body}})            
                    res.status(200).json({status  : httpStatusText.SUCCESS , data : {course : updatedCourse}});
          
              
        }
    )

    const deleteCourse = asyncWrapper(
                    async (req, res) => {
            const data = await Course.deleteOne({_id: req.params.courseId})  
           res.status(200).json({sucess: httpStatusText.SUCCESS , data : null});
     
         }
    )

module.exports = {getAllCourses , getSingleCourse , addCourse , updateCourse , deleteCourse};