// On request, see: https://github.com/request/request
// On express, see: https://expressjs.com/en/4x/api.html

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

// Couldn't yet find a way to use process.env constructed in Webpack config, need to parse separately.
const dotEnvVars = require('dotenv').config().parsed;
const url = dotEnvVars.GOOGLE_URL_SHORTENER_API;
const key = dotEnvVars.API_KEY;

app.use(bodyParser.json());

// See: https://www.slideshare.net/michaelneale/cors-michael-webdirections
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:shortcode/stats', (req, res, next) => {
    console.log('req:', req.params.shortcode); // TODO: store both longUrl anf shortUrl and use the latter here.

    request.get({ url, qs: { key, shortUrl: `http://goo.gl/${req.params.shortcode}`, projection: 'ANALYTICS_CLICKS' } }, (error, response, body) => {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);

        res.status(response.statusCode).send(error || body);
    });
});

app.post('/shorten', (req, res, next) => {
    request.post({ url, body: { longUrl: req.body.url }, json: true, qs: { key } }, (error, response, body) => {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);

        res.status(response.statusCode).send(error || body);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

