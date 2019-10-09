const http = require('http');

const exp = require('express');

const app = exp();

app.use((req, res, next) => {
    console.log('the first middleware...');
    next();
});

app.use((req, res, next) => {
    console.log('the second middleware...');
});

const server = http.createServer(app);

server.listen(3000);