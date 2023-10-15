const jwt = require('jsonwebtoken');

module.exports.checkAuth = (req, res, next) => {
    try{
        const authorization = req.headers.authorization;
        const token = authorization.split('Bearer ')[1]; //Bearer <token>
        jwt.verify(token, "super-secret");
        next();
    } catch (err) {
        return res.status(401).json({message: 'Unauthorized', error: err});
    }
}