const router = require('express').Router();
const controllers = require('../controllers/index');


router.get('/', controllers.home);

router.get('/register', controllers.register_get);

router.post('/register', controllers.register_post);

module.exports = router;
