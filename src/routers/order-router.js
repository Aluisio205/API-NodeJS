'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service')

router.get('/', controller.get);
router.post('/', authService.autorize, controller.post);
router.put('/', authService.autorize, controller.put);
router.delete('/', authService.autorize, controller.delete);



module.exports = router;