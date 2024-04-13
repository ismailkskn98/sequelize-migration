const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); 
const csrfToken = require('../middlewares/csrfToken');

//register
router.get('/register', csrfToken, authController.getRegister);
router.post('/register', authController.postRegister);
// login
router.get('/login', csrfToken, authController.getLogin);
router.post('/login', authController.postLogin);
// reset
router.get('/reset-password', csrfToken, authController.getReset);
router.post('/reset-password', authController.postReset);
// new password
router.get('/new-password/:token', csrfToken, authController.getNewpassword);
router.post('/new-password', authController.postNewpassword);

router.get('/logout', csrfToken, authController.getLogout);

module.exports = router;