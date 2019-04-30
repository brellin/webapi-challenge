const express = require('express')
const adb = require('../data/helpers/actionModel')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const get = await adb.get()
        res.status(200).json(get)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something has gone wrong. Please try again later."
        })
    }
})

router.post('/', async (req, res) => {
    const { body } = req
    try {
        const action = await adb.insert(body)
        const get = await adb.get()
            res.status(200).json(get)
    } catch (err) {
        console.log(err)
        res.status(400).json({
                message: "You must include 'project_id'(number, any), 'description'(string, up to 128 characters), and 'notes'(string, no limit) keys in your POST request to the '/actions' endpoint. You may choose to also include a 'completed'(boolean) key - to indicate whether or not the action has been completed.",
                errorNumber: err.errno,
                errorCode: err.code
        })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const del = await adb.remove(id),
            get = await adb.get()
        del ?
            res.status(200).json(get)
            :
            res.status(400).json({
                message: "You must include the id of the action you wish to delete"
            })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const {body} = req
    try {
        const put = await adb.update(id, body)
        const get = await adb.get()
        put ? 
            res.status(200).json(get)
            :
            res.status(400).json({
                message: "You must include the id of the action you wish to update."
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong. Please try again later or try including some updates."
        })
    }
})

module.exports = router
