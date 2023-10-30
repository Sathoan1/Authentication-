const router = require('express').Router();

const {register, login, login2}= require('../controllers/auth');

router.post ('/register', register);
router.post('/login', login);
router.post('/signin', login2)

module.exports = router