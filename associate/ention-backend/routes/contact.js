const express = require('express');
const router = express.Router();
const { sendContactMail } = require('../controllers/contactController');

// POST /api/contact
router.post('/', sendContactMail);

module.exports = router;
