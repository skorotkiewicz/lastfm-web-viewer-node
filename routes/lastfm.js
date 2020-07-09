const express = require('express');
const router = express.Router();
const lastfm = require('../controllers/lastfm.controller');

router.get('/', lastfm.lastActivity);
router.get('/:user', lastfm.lastActivity);

module.exports = router;