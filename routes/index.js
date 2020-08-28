const router = require('express').Router();
const controllers = require('../contorllers/index');

const { home } = require('../controllers/index');

router.get('/', home);

module.exports = router;
