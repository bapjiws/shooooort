const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    console.log(`THIS SERVER IS MEANT ONLY FOR PRODUCTION! SORRY, BRO ${String.raw`¯\_(ツ)_/¯`}`);
} else {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'));
    });

    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`♫ Listening on port ${port} ♫`));
}