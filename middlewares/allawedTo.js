const appError = require("../utils/appError");


module.exports = (...roles) => {
    // console.log(roles);
    
    return (req , res , next) => {
        // console.log(req.currentUser.role);
        
        if(!roles.includes(req.currentUser.role)) {
            return next(appError.create('This role is not authorized' , 401))
        }
        next();
    }
}