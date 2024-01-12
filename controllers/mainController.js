const Service = require('../models/serviceModel')
const Vehicle = require('../models/vehicleModel')
const cloudinary = require('../config/cloudinary')

const servicePage = (req, res) =>  {
    res.render('log', {user: req.user})
}

const landingPage = (req, res) => {
    res.render('landing', {user: req.user})
}

const homePage = async (req, res) => {
    try {
    if(req.isAuthenticated()) {
        const userId = req.user._id
        const services = await Service.find({ user: userId}).populate('user')
        const vehicles = await Vehicle.find({ user: userId}).populate('user')
        console.log(services)
        res.render('home', {services: services, user: req.user, vehicles: vehicles})
    } else {
        res.redirect('/')
    }

    } catch (error) {
        console.log(error)
    }
}

const newService = async (req, res) => {
    console.log(req.body)

    const service = new Service ({
        date: req.body.date,
        mileage: req.body.mileage,
        typeOfService: req.body.typeOfService,
        serviceNotes: req.body.serviceNotes,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        user: req.user._id 
    })

    try {
        await service.save()
        console.log('Service saved successfully. Redirecting...')
        res.redirect('/home')
    } catch (error) {
        console.error('Error saving new service:', error)
        res.status(500).send('Error creating new service.')
    }
}

const editPage = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        res.render('edit', { service: service, user: req.user })
    } catch (error) {
        console.log(error)
    }
}

const updateService = async (req, res) => {
    console.log(req.params.id, req.body)
    try {
        let service = await Service.findById(req.params.id)
        if(service.user.equals(req.user._id)) {
        await Service.findByIdAndUpdate(req.params.id, req.body)
        }
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

const deleteService = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        let service = await Service.findById(req.params.id)
        if(service.user.equals(req.user._id)) {
        await Service.findByIdAndRemove(req.params.id)
        }
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

// VEHICLE METHODS

const vehiclePage = (req, res) => {
    res.render('logVehicle', {user: req.user})
}

const newVehicle = async (req, res) => {
        const vehicle = new Vehicle ({
            name: req.body.name,
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            otherInfo: req.body.otherInfo,
            user: req.user._id 
        })
    
        try {
            await vehicle.save()
            console.log('Vehicle saved successfully. Redirecting...')
            res.redirect('/home')
        } catch (error) {
            console.error('Error saving new vehicle:', error)
            res.status(500).send('Error creating new service.')
        }
}

const vehicleEditPage = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        res.render('editVehicle', { vehicle: vehicle, user: req.user })
    } catch (error) {
        console.log(error)
    }
}

const updateVehicle = async (req, res) => {
    console.log(req.params.id, req.body)
    try {
        let vehicle = await Vehicle.findById(req.params.id)
        if(vehicle.user.equals(req.user._id)) {
        await Vehicle.findByIdAndUpdate(req.params.id, req.body)
        }
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    servicePage,
    homePage,
    newService,
    editPage,
    updateService,
    deleteService,
    landingPage,
    vehiclePage,
    newVehicle,
    vehicleEditPage,
    updateVehicle,
}