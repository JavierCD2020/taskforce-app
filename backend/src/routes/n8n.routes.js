const express = require('express');
const n8nController = require('../controllers/n8n.controller');

const router = express.Router();

router.post('/n8n-test', n8nController.postN8nTest);

module.exports = router;
