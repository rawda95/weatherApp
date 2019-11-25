var express = require('express');
var request = require('request');
//var JSON = require('JSON');
var router = express.Router();

var apiKey = 'd06b6cee99877c87f0ab877b5e58e53d';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res) {

    let city = req.body.city;

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    console.log(req.body.city);

    request(url, (err, response, body) => {

        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });

        } else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
    // res.render('index');

});

module.exports = router;