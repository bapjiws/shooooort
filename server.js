const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
    console.log(`THIS SERVER IS MEANT ONLY FOR PRODUCTION! SORRY, BRO ${String.raw`¯\_(ツ)_/¯`}`);
} else {
    const app = express();

    const url = process.env.GOOGLE_URL_SHORTENER_API;
    const key = process.env.API_KEY;

    app.use(bodyParser.json());

    // See: https://www.slideshare.net/michaelneale/cors-michael-webdirections
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/:shortcode/stats', (req, res, next) => {
        request.get({ url, qs: { key, shortUrl: `http://goo.gl/${req.params.shortcode}`, projection: 'ANALYTICS_CLICKS' } }, (error, response, body) => {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);

            res.status(response.statusCode).send(error || body);
        });
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'));
    });

    app.post('/shorten', (req, res, next) => {
        request.post({ url, body: { longUrl: req.body.url }, json: true, qs: { key } }, (error, response, body) => {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);

            res.status(response.statusCode).send(error || body);
        });
    });

    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`♫ Listening on port ${port} ♫`));
}
