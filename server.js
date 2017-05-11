const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

// Couldn't yet find a way to use process.env constructed in Webpack config, need to parse separately.
const dotEnvVars = require('dotenv').config().parsed;
const uri = dotEnvVars.GOOGLE_URL_SHORTENER_API;
const key = dotEnvVars.API_KEY;

app.use(bodyParser.json());

// See: https://www.slideshare.net/michaelneale/cors-michael-webdirections
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if (process.env.NODE_ENV !== 'production') {
    console.log(`THIS SERVER IS MEANT ONLY FOR PRODUCTION! SORRY, BRO ${String.raw`¯\_(ツ)_/¯`}`);
} else {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'));
    });

    app.get('/:shortcode/stats', (req, res, next) => {
        console.log('req:', req.params.shortcode); // TODO: store both longUrl anf shortUrl and use the latter here.
        console.log('uri:', uri);

        request.get({ uri, qs: { key, shortUrl: `http://goo.gl/${req.params.shortcode}`, projection: 'ANALYTICS_CLICKS' } }, (error, response, body) => {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);

            res.status(response.statusCode).send(error || body);
        });
    });

    app.post('/shorten', (req, res, next) => {
        request.post({ uri, body: { longUrl: req.body.url }, json: true, qs: { key } }, (error, response, body) => {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);

            res.status(response.statusCode).send(error || body);
        });
    });

    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`♫ Listening on port ${port} ♫`));
}