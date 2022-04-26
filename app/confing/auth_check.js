// import jwt_decode from "jwt-decode";
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization;
        const token = bearer;
        if (!token) {
            return res.status(403).send({
                success: false,
                message: "A token is required for authentication",
                errors: ["A token is required for authentication"]
            });
        }
        let decoded = jwt_decode(token);

        if(decoded?.user?.userType?.toLowerCase() == "admin") {
            req.user = decoded?.user;
            return next();
        }
        else if(decoded?.user?.userType?.toLowerCase() == "customer") {
            req.user = decoded?.user;
            return next();
        }
        else if(decoded?.user?.userType?.toLowerCase() == "owner") {
            req.user = decoded?.user;
            return next();
        }
        else if(decoded?.user?.userType?.toLowerCase() == "collector") {
            req.user = decoded?.user;
            return next();
        }
        else {
            return res.status(401).send({
                success: false,
                message: "Invalid Token",
                errors: ["Invalid Token"]
            });
        }
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error.message,
            errors: ["Invalid Token"]
        });
    }
}