import jwt from "jsonwebtoken";
import { UnAuthorizedException } from "../exceptions/unauthorized.js";
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from "../src/config/jwt.config.js";
import logger from "../src/config/winston.config.js";

export const ProtectedMiddleware = (isProtected) => {
    return (req, res, next) => {
        if (!isProtected) {
            req.role = "user";
            logger.info("User has been granted access without authentication.");
            return next();
        }

        let accessToken;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            accessToken = authHeader.split(" ")[1];
        } else {
            accessToken = req.cookies?.accessToken;
        }

        const refreshToken = req.cookies?.refreshToken;

        if (!accessToken && !refreshToken) {
            logger.error("Access token is missing");
            throw new UnAuthorizedException("Unauthorized", 401);
        }

        if (!accessToken && refreshToken) {
            try {
                const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

                const newAccessToken = jwt.sign(
                    { user: data.user, role: data.role },
                    ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
                        algorithm: "HS256",
                    }
                );

                const newRefreshToken = jwt.sign(
                    { user: data.user, role: data.role },
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
                    maxAge: 1000 * 60 * 60 * 24,
                });

                req.user = data.user;
                req.role = data.role;

                logger.info("Access token has been refreshed.");

                return next();
            } catch (error) {
                logger.error("Error verifying refresh token:");
                return next(new UnAuthorizedException("Invalid refresh token", 401));
            }
        }

        try {
            const decodedData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
            req.user = decodedData.user;
            req.role = decodedData.role;

            logger.info("Access token is valid.");
            return next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                logger.error("Access token has expired.");
                return next(new UnAuthorizedException("Token expired", 401));
            } else if (error instanceof jwt.JsonWebTokenError) {
                logger.error("Invalid JWT format.");
                return next(new UnAuthorizedException("Invalid JWT format", 400));
            } else if (error instanceof jwt.NotBeforeError) {
                logger.error("Token is not valid yet.");
                return next(new UnAuthorizedException("Token is not valid yet", 409));
            } else {
                return next(error);
            }
        }
    };
};
