export const ProtectedMiddleware = (isProtected) => {
    return (req,res,next) => {
        if (!isProtected) {
            req.role = "user";
            return next();
        } else {
            const {role} = req.user;
            if (role === "admin") {
                req.role = "admin";
                return next();
            } else {
                return res.status(403).send({message: "You are not authorized to access this resource"});
            }
        }

    }
}