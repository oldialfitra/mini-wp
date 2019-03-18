const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    console.log('masuk sini mid')
    console.log(req.body);

    console.log('ini baru')
    console.log(req.headers);
    if (req.headers.token) {
        try {
            req.userLoggedIn = jwt.verify(req.headers.token, process.env.SECRET)
            console.log(req.userLoggedIn);
            next();
        } catch {
            res.status(401).json({ message: `Invalid Token` })
        }
    }
}