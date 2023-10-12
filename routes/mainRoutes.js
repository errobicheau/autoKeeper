// Direct traffic when it is called from server.js to appropriate controller

const express = require('express')
const mainController = require('../controllers/mainController')
const router = express.Router()

router
    .route('/')
    .get(mainController.loginPage)

module.exports = router