const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

const inProductionMode = process.env.NODE_ENV === 'production';

let url, key;

if (!inProductionMode) {
    const dotEnvVars = require('dotenv').config().parsed;
    url = dotEnvVars.GOOGLE_URL_SHORTENER_API;
    key = dotEnvVars.API_KEY;
} else {
    url = process.env.GOOGLE_URL_SHORTENER_API;
    key = process.env.API_KEY;
}

if (!inProductionMode) {
    const webpackConfig = require('./webpack.config');
    const compiler = require('webpack')(webpackConfig);

    // Webpack Dev Middleware: https://github.com/webpack/webpack-dev-middleware
    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    });
    // Webpack Hot Middleware: https://github.com/glenjamin/webpack-hot-middleware
    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware);
} else {
    app.use(express.static(path.join(__dirname, 'build')));
    app.use('/assets', express.static(path.join(__dirname, './assets')));
}

app.use(bodyParser.json());

// See: https://www.slideshare.net/michaelneale/cors-michael-webdirections
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:shortcode/stats', (req, res, next) => {
    request.get({ url, qs: { key, shortUrl: `http://goo.gl/${req.params.shortcode}`, projection: 'ANALYTICS_CLICKS' } }, (error, response, body) => {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);

        res.status(response.statusCode).send(error || body);
    });
});

if (!inProductionMode) {
    const bundlePath = path.join(__dirname, './build/index.html');
    app.get('*', (req, res) =>  {
        res.write(webpackDevMiddleware.fileSystem.readFileSync(bundlePath));
        res.end();
    });
} else {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'));
    });
}

app.post('/shorten', (req, res, next) => {
    request.post({ url, body: { longUrl: req.body.url }, json: true, qs: { key } }, (error, response, body) => {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);

        res.status(response.statusCode).send(error || body);
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => inProductionMode ?
    console.log(`♫ In production mode. Listening on port ${port} ♫`) :
    console.log(`♫ In development mode. Listening on port ${port}  ♫`)
);