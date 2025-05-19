const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access_secret';

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};
