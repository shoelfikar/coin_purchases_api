require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session');
const Router = require('./src/routers/index')

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(session({secret: process.env.SECRET_KEY,cookie:{maxAge:360000000}}));
app.use(cors())
app.use(morgan('dev'))
app.use('/', Router)

app.listen(port, ()=> {
    console.log(`app is running in port ${port}`)
})