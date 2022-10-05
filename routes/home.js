const express = require('express')
const axios = require('axios')
const home=express.Router()
const moment = require('moment')
const math = require('math')
const fast2sms=require('fast-two-sms')
const { response } = require('express')
const nodemailer = require('nodemailer')

home.get('/',async(req,res)=>{
    try {
        var url = 'https://nmweb.nammaooru.co/homedata/web';

        const home_get =await axios.get(url)
        console.log(home_get.data)
        res.render('home',{categories:home_get.data.result[0].categories})




    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
}) 

home.get('/details/:id', async (req, res) => {
    let categoriesID = req.params.id

    try {
        const newsAPI = await axios.get(`https://nmweb.nammaooru.co/postdata/${categoriesID}`)
       // console.log(newsAPI.data)
        res.render('newsSingle', { categories: newsAPI.data.result })
    } catch (err) {
        if (err.response) {
            res.render('newsSingle', { categories: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSingle', { categories: null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', {categories: null })
            console.error('Error', err.message)
        }
    }
})



home.get('/:news_cat_id',async(req,res)=>{
    let categoriesID = req.params.news_cat_id
    try {
        const home_get = await axios.get(`https://nmweb.nammaooru.co/postdata/bycat/${categoriesID}`)
 
        console.log(home_get.data)
        res.render('newscategories',{categories:home_get.data.result})

    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
}) 



home.get('/about/page',function(req,res){
    res.render('about');
})
home.get('/contact/page',function(req,res){
    res.render('contact');
})


var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 995,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'almustaqpondyworld@gmail.com',
        pass: 'kewrufecaqdmsvsa',
    }

});

home.post('/send', function (req, res) {
    email = req.body.email;

    // send mail with defined transport object
    var mailOptions = {
        to: req.body.email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('otp');
    });
});







home.post('/search',async(req,res)=>{
    const search=req.body.search
    // console.log(req.body.search)

    try {
        var url = `http://newsapi.org/v2/everything?q=${search}&apiKey={5a7c72dd7cc849e990b327a40da9db5b}`

        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})





    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})


module.exports=home