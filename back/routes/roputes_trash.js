const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const { request } = require("node:http")

const controller = require("../controller/controller_trash.js")

app.get('/candly/trash', cors(), async (req, res) => {
    const trash = await controller.selectTrash()

    res.status(trash.status_code).json(trash)
})

app.post('/candly/trash', cors(), bodyParserJSON, async (req, res) => {
    const dataBody = req.body
    const contentType = req.headers['content-type']

    const trash = await controller.postCandy(dataBody, contentType)
    res.status(trash.status_code).json(trash)
})

module.exports = app
