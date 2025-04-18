import { ROLES } from "../src/constants/role.constant.js";


export const RolesMiddleware = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user ? req.user.role : undefined;

        if (roles.includes(ROLES.ALL)) {
            return next();
        }
        console.log("User role:", userRole);

        if (!userRole) {
            return res.status(401).json({
                message: "role is required",
            });
        }
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: "You are not authorized to access this resource",
            });
        }
        next();
    }
}
