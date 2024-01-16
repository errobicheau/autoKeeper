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
    .route('/service')
    .get(mainController.servicePage)
    .post(mainController.newService)

router
    .route('/vehicle')
    .get(mainController.vehiclePage)
    .post(mainController.newVehicle)

router
    .route('/editVehicle/:id')
    .get(mainController.vehicleEditPage)
    .post(mainController.updateVehicle)

router
    .route('/edit/:id')
    .get(mainController.editPage)
    .post(mainController.updateService)

router
    .route('/delete/:id')
    .post(mainController.deleteService)

module.exports = router