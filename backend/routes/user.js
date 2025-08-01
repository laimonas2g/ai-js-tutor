const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/complete-lesson', UserController.completeLesson);
router.get('/progress/:userId', UserController.getProgress);
router.get('/badges/:userId', UserController.getBadges);
router.get('/points/:userId', UserController.getPoints);

module.exports = router;