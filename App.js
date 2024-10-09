const express = require('express')
const app = express()
const env = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./config/db')

env.config();
const port = process.env.PORT || 4001;

app.use(bodyParser.json())

app.use('', require('./Routes/authRoute'))

app.listen(port, () => {
    console.log(`Express project is running on: ${port}`)
})