const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const { request } = require("node:http")

const controller = require("../controller/controller_candy.js")

app.get('/candly/candy', cors(), async (req, res) => {
    const candy = await controller.selectCandy()

    res.status(candy.status_code).json(candy)
})

app.get('/candly/candy/:id', cors(), async (req, res) => {
    const id = req.params.id
    const candy = await controller.selectCandyById(id)

    res.status(candy.status_code).json(candy)
})

app.post('/candly/candy', cors(), bodyParserJSON, async (req, res) => {
    const dataBody = req.body
    const contentType = req.headers['content-type']

    const candy = await controller.postCandy(dataBody, contentType)
    res.status(candy.status_code).json(candy)
})

app.put('/candly/candy/:id', cors(), bodyParserJSON, async (req, res) => {
    const id = req.params.id
    const dataBody = req.body
    const contentType = req.headers['content-type']

    const candy = await controller.alterCandy(dataBody, contentType, id)
    res.status(candy.status_code).json(candy)
})

app.delete('/candly/candy', cors(), bodyParserJSON, async (req, res) => {
    const dataBody = req.body

    const candy = await controller.removeCandy(dataBody)
    res.status(candy.status_code).json(candy)
})

module.exports = app
