
const {body} = require('express-validator');

const validationSchema = () => {
    return [ 
        body('title')
            .notEmpty()
            .withMessage('Title Is Required')
            .isLength({min: 2})
            .withMessage('Title At Least is 2 digits'),

        body('price')
            .notEmpty()
            .withMessage("Price is Required") 
        ] 
}

module.exports = validationSchema;