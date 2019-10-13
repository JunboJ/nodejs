const fs = require('fs');

function reqHandler(req, res) {
    const url = req.url;
    const method = req.method;
    if (url === '/main') {
        res.write('<html>');
        res.write('<head><title>Main page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write('</body>')
        res.write('</html>');
        return res.end();
    }
    
    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunck) => {
            console.log(chunck);
            body.push(chunck);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome to my first node web!</title></head>');
    res.write('<body><h1>Hello James, it has been a long time.</h1>');
    res.write('<h2>Now, please continue.</h2>');
    res.write('<a href="/main">Main page</a>');
    res.write('</html>');
    res.end();
};

module.exports = {
    handler: reqHandler,
    message: "This is the message"
};