const router = require('express').Router();
const auth = require('../http/middlewares/auth/verifyToken');

router.get('/', auth, (req, res) => {
    res.send(req.user)
    // res.json({posts: {
    //     title: "Some post title",
    //     description: "Secret post for only auth users"}
    // })
});

module.exports = router;