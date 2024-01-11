const Service = require('../models/serviceModel')
const cloudinary = require('../config/cloudinary')

const logPage = (req, res) =>  {
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
        res.render('home', {services: services, user: req.user})
    } else {
        res.redirect('/login')
    }

    } catch (error) {
        console.log(error)
    }
}

const newService = async (req, res) => {
    console.log(req.body);
    console.log(req.files)

    // Check if a file was uploaded
    if (req.files && req.files.file) {
        const file = req.files.file; // Access the uploaded file
        try {
            const result = await cloudinary.uploader.upload(file.tempFilePath);
            const service = new Service({
                date: req.body.date,
                mileage: req.body.mileage,
                typeOfService: req.body.typeOfService,
                serviceNotes: req.body.serviceNotes,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                user: req.user._id //attach logged in user id to new service
            })

            await service.save()
            res.redirect('/home')
            
        } catch (error) {
            console.log(error);
        }
    } else {
     console.log('This is an error.')
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

module.exports = {
    logPage,
    homePage,
    newService,
    editPage,
    updateService,
    deleteService,
    landingPage
}