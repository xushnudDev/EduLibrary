import jwt from "jsonwebtoken";
import { UnAuthorizedException } from "../exceptions/unauthorized.js";
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from "../src/config/jwt.config.js";


export const ProtectedMiddleware = (isProtected) => {
    return (req, res, next) => {
        if (!isProtected) {
            req.role = "user";
            return next();
        }

        const accessToken = req.cookies?.accessToken;
        const refreshToken = req.cookies?.refreshToken;


        if (!accessToken && !refreshToken) {
            throw new UnAuthorizedException("Unauthorized", 401);
        }

        if (!accessToken && refreshToken) {
            try {
                const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

                const newAccessToken = jwt.sign(
                    { data: data.user, role: data.role },
                    ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
                        algorithm: "HS256",
                    }
                );

                const newRefreshToken = jwt.sign(
                    { data: data.user, role: data.role },
                    REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
                        algorithm: "HS256",
                    }
                );

                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60,
                });
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 1,
                });
            } catch (error) {
                return next(new UnAuthorizedException("Invalid refresh token", 401));
            }
        }

        try {
            const decodedData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
            req.role = decodedData.role;
            req.user = decodedData.user;
            return next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return next(new UnAuthorizedException("Token expired", 401));
            } else if (error instanceof jwt.JsonWebTokenError) {
                return next(new UnAuthorizedException("Invalid JWT format", 400));
            } else if (error instanceof jwt.NotBeforeError) {
                return next(new UnAuthorizedException("Token is not valid yet", 409));
            } else {
                return next(error);
            }
        }
    };
};
