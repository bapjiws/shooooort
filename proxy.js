const express = require('express');
const request = require('request');

const app = express();
const api = 'https://gymia-shorty.herokuapp.com';

// See: https://www.slideshare.net/michaelneale/cors-michael-webdirections
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:shortcode/stats', (req, res, next) => {
    console.log('req.url:', req.url);

    request(api + req.url, (error, response, body) => {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);

        // TODO: res.status(404) will reject the promise on client side and it won't get the {error: "The shortcode cannot be found in the system"} payload
        res.status(response.statusCode).send(error || body);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

