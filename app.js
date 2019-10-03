const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // exit server on load of webpage
    // process.exit();
    const url = req.url;
    const method = req.method;
    if (url === '/main') {
        res.write('<html>');
        res.write('<head><title>Main page</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write('</body>')
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunck) => {
            console.log(chunck);
            body.push(chunck);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);
            fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/main');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome to my first node web!</title><head>');
    res.write('<body><h1>Hello James, it has been a long time.</h1>');
    res.write('<h2>Now, please continue.</h2>');
    res.write('<form action="/main" method="GET"><button type="submit">Main page</button></form>');
    res.write('</html>');
    res.end();

});

server.listen(3000);