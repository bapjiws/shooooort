var express = require('express');
var request = require('request');

var app = express();

// Source: https://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
// app.use('/', function(req, res) {
//     var url = 'https://gymia-shorty.herokuapp.com' + req.url;
//     console.log('url:', url);
//
//     // request(url, (error, response, body) => {
//     //     console.log('error:', error); // Print the error if one occurred
//     //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     //     console.log('body:', body); // Print the HTML for the Google homepage.
//     // });
//
//     console.log('request(url):', req.pipe().pipe(res));
//     req.pipe(request(url)).pipe(res);
// });

// See: https://www.slideshare.net/michaelneale/cors-michael-webdirections
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res, next) {
    var url = 'https://gymia-shorty.herokuapp.com/example1/stats';
    request(url, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        // res.send(new Promise((resolve, reject) => {
        //    resolve(body)
        // }));

        res.send(body);
        // res.end();
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

