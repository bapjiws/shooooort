const express = require('express');
const request = require('request');

const app = express();

// See: https://www.slideshare.net/michaelneale/cors-michael-webdirections
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res, next) => {
    const url = 'https://gymia-shorty.herokuapp.com/example1/stats';
    request(url, (error, response, body) => {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);

        res.status(response.statusCode).send(error || body);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

