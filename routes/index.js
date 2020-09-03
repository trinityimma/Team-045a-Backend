const router = require('express').Router();

const { home } = require('../controllers/index');
const controllers = require('../controllers/index');


router.get('/', home);

router.get('/register',controllers.register_get);

router.post('/register', controllers.register_post);

router.get('/login', controllers.login_get);

router.post('/login', controllers.login_post);

module.exports = router;
