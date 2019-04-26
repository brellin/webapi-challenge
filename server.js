const express = require('express')

const projectsRouter = require('./routers/pjr')
const actionsRouter = require('./routers/ar')

const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

server.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: "I'm happy you decided to perform a GET request here, but all you're going to get is this text. There are no other requests to try on this endpoint."
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something went wrong...'
        })
    }
})

server.use('/projects', projectsRouter)
server.use('/actions', actionsRouter)

module.exports = server
