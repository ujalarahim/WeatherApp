import CustomError from "../handler/CustomError.handler.js";

function allowRoles(...roles){
    return (req,res,next)=>{
        const role = req.role; // this will get role from auth middleware

       if (!roles.includes(role)) {
            return next(new CustomError(403, "Access Denied: Only Admins can perform this action"));
        }

        next();
    }
}

export {allowRoles}