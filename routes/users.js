const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
console.log('router2 loaded');
router.get('/profile', userController.profile);
router.get('/news', userController.news);
router.get('/feed', userController.feed);

module.exports = router;