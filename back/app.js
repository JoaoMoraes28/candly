'use strict'

const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
const bodyParser = require('body-parser')

const routesUser = require("./routes/routes_user.js")
const routesCandy = require("./routes/routes_candy.js")
const routesTrash = require("./routes/roputes_trash.js")

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Acess-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
    );
    next();
});

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(routesUser)
app.use(routesCandy)
app.use(routesTrash)

app.listen(port, () => {
    console.log(`API aguardando requisições pela porta ${port}..`)
})