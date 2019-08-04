const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Auth-token missing');

    try {
        const veriied = jwt.verify(token, process.env.JWT_SECRET);

        req.user = veriied;

        next();
    } catch (e) {
        res.status(400).send('Invalid token.')
    }
}

module.exports = auth;