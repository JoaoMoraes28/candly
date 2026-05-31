const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const { request } = require("node:http")

const controller = require("../controller/controller_user.js")

app.post('/candly/user', cors(), bodyParserJSON, async (req, res) => {
    const dataBody = req.body
    const contentType = req.headers['content-type']

    const user = await controller.postUser(dataBody, contentType)
    res.status(user.status_code).json(user)
})

app.post('/candly/auth/user', cors(), bodyParserJSON, async (req, res) => {
    const dataBody = req.body
    const contentType = req.headers['content-type']

    const user = await controller.verifyUser(dataBody, contentType)
    res.status(user.status_code).json(user)
})

module.exports = app
