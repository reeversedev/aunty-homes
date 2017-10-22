var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var nodemailer = require('nodemailer');

router.get('/', function (req, res, next) {
    res.render('front/index', {
        title: 'Aunty Homes'
    });
});
router.get('/contact', function (req, res, next) {
    res.render('contact/index');
});

router.get('/about', function (req, res, next) {
    res.render('about/index', {
        title: 'About Us'
    });
});
router.get('/blog', function (req, res, next) {
    res.render('blog/index');
});
router.get('/sitemap', function (req, res, next) {
    res.sendFile(__dirname + '/sitemap/sitemap.xml');
});
router.post('/contact', function (req, res) {
    var contact = new Contact({
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email,
        message: req.body.message
    });

    contact.save(function (err, result) {
        res.redirect('/');
    });
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.live.com',
            port: 25,
            secure: false,
            auth: {
                user: 'gogia.prateek@hotmail.com',
                pass: '9560@shutup'
            }
        });
        let mailOptions = {
            from: '"Aunty Homes Reminder" <gogia.prateek@hotmail.com>',
            to: 'ayushgogia456@gmail.com, reeversedev@gmail.com',
            subject: 'You have a new request',
            text: 'Greetings from Aunty Homes',
            html: '<b>Greetings from Aunty Homes!<b> \n' +
                '<ul>' +
                '<li>' + contact.name + '</li>' +
                '<li>' + contact.telephone + '</li>' +
                '<li>' + contact.email + '</li>' +
                '<li>' + contact.message + '</li>' +
                '</ul>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
});

module.exports = router;