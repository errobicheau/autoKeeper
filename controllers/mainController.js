const Log = require('../models/logModel')
// require multer or photo service here

const logPage = (req, res) =>  {
    res.render('log', req.user)
}

const homePage = async (req, res) => {
    try {
        const logs = await Log.find().populate('user')
        res.render('home', {logs: logs, user: req.user})
    } catch (error) {
        console.log(error)
    }
}

const newLog = async (req, res) => {
    console.log(req.body)
    try {
        const log = new Log({
            date: req.body.date,
            workout1: req.body.workout1,
            workout2: req.body.workout2,
            readingNotes: req.body.readingNotes,
            otherNotes: req.body.otherNotes,
            user: req.user._id //attach logged in user id to new log
    })

    await log.save()
    res.redirect('/')

    } catch (error) {
        console.log(error)
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
        res.redirect('/')
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
        res.redirect('/')
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
    deleteLog
}