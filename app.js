const express = require('express')
const path = require('path');
const app=express()
const port = process.env.PORT||3000;
const bodyParser = require('body-parser');
const moment = require('moment')
const nodemailer = require('nodemailer')
app.locals.moment = moment;





// template engine  
app.use( express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',require('./routes/home'))



app.set('views','./views')

app.listen(port,()=> console.log("started"))