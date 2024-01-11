// Direct traffic when it is called from server.js to appropriate controller

const express = require('express')
const mainController = require('../controllers/mainController')
const router = express.Router()


router
    .route('/')
    .get(mainController.landingPage)

router
    .route('/home')
    .get(mainController.homePage)

router
    .route('/log')
    .get(mainController.logPage)
    .post(mainController.newService)

router
    .route('/edit/:id')
    .get(mainController.editPage)
    .post(mainController.updateService)

router
    .route('/delete/:id')
    .post(mainController.deleteService)

module.exports = router