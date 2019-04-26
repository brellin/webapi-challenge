const express = require('express')
const pjdb = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const get = await pjdb.get()
        res.status(200).json(get)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something has gone wrong. Please try again later."
        })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const getById = await pjdb.get(id)
        getById ?
            res.status(200).json(getById)
            :
            res.status(400).json({
                message: "No project found with that id. Try a different one."
            })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/project/:id', async (req, res) => {
    const { id } = req.params
    try {
        const get = await pjdb.getProjectActions(id)
        get ?
            res.status(200).json(get)
            :
            res.status(400).json({
                message: "No project found with that id. Try a different one."
            })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    const { body } = req
    if (body.name && body.description) {
        try {
            pjdb.insert(body)
            const get = await pjdb.get()
            res.status(200).json(get)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Something went wrong. Please try again later."
            })
        }
    } else {
        res.status(400).json({
            message: "You must include a 'name'(string) AND 'description'(string) key."
        })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const del = await pjdb.remove(id)
        const get = await pjdb.get()
        del ?
            res.status(200).json(get)
            :
            res.status(400).json({
                message: "Unable to find a project with the id provided. Try again."
            })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    if (body.description || body.completed || body.name) {
        try {
            const put = await pjdb.update(id, body)
            const get = await pjdb.get()
            put ?
                res.status(200).json(get)
                :
                res.status(400).json({
                    message: "Unable to find a project with the provided id. Please try again."
                })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({
            message: "You must include a 'name', 'description', OR 'completed' key in your update. Please try again."
        })
    }
})

module.exports = router
