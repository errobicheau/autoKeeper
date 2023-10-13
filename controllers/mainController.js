const Log = require('../models/logModel')
// require multer or photo service here

const loginPage = (req, res) => {
    res.render('login')
}

const logPage = (req, res) =>  {
    res.render('log')
}

const homePage = async (req, res) => {
    try {
        const logs = await Log.find()
        res.render('home', {logs: logs})
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
            otherNotes: req.body.otherNotes
    })

    await log.save()
    res.redirect('home')

    } catch (error) {
        console.log(error)
    }
}

const editPage = async (req, res) => {
    try {
        const log = await Log.findById(req.params.id)
        res.render('edit', { log: log })
    } catch (error) {
        console.log(error)
    }
}

const updateLog = async (req, res) => {
    console.log(req.params.id, req.body)
    try {
        await Log.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

const deleteLog = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        await Log.findByIdAndRemove(req.params.id)
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    loginPage,
    logPage,
    homePage,
    newLog,
    editPage,
    updateLog,
    deleteLog
}