const Log = require('../models/logModel')
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
        const logs = await Log.find({ user: userId}).populate('user')
        res.render('home', {logs: logs, user: req.user})
    } else {
        res.redirect('/login')
    }

    } catch (error) {
        console.log(error)
    }
}

const newLog = async (req, res) => {
    console.log(req.body);
    console.log(req.files)

    // Check if a file was uploaded
    if (req.files && req.files.file) {
        const file = req.files.file; // Access the uploaded file
        try {
            const result = await cloudinary.uploader.upload(file.tempFilePath);
            const log = new Log({
                date: req.body.date,
                workout1: req.body.workout1,
                workout2: req.body.workout2,
                readingNotes: req.body.readingNotes,
                otherNotes: req.body.otherNotes,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                user: req.user._id //attach logged in user id to new log
            })

            await log.save()
            res.redirect('/home')
            
        } catch (error) {
            console.log(error);
        }
    } else {
     console.log('Error: No File Upload Found')
}
}

const editPage = async (req, res) => {
    try {
        const log = await Log.findById(req.params.id)
        res.render('edit', { log: log, user: req.user })
    } catch (error) {
        console.log(error)
    }
}

const updateLog = async (req, res) => {
    console.log(req.params.id, req.body)
    try {
        let log = await Log.findById(req.params.id)
        if(log.user.equals(req.user._id)) {
        await Log.findByIdAndUpdate(req.params.id, req.body)
        }
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

const deleteLog = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        let log = await Log.findById(req.params.id)
        if(log.user.equals(req.user._id)) {
        await Log.findByIdAndRemove(req.params.id)
        }
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    logPage,
    homePage,
    newLog,
    editPage,
    updateLog,
    deleteLog,
    landingPage
}