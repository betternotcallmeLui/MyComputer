const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const os = require('os');

const PORT = process.env.PORT || 3000

server.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
});

app.use(express.static('public'))
app.get('*', function(req, res) {
    res.sendFile('index.html', { root: __dirname })
})

const networkInterfaces = os.networkInterfaces();

for (let interface in networkInterfaces) {
    for (let i = 0; i < networkInterfaces[interface].length; i++) {
        let addr = networkInterfaces[interface][i];
        if (addr.family === "IPv4") {
            var ips = addr.address
        }
    }
}

setInterval(function () {
    const usage = {
        cpu: os.cpus(),
        memory: (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024,
        disk: os.totalmem() / 1024 / 1008 / 1000,
        sisoperativo: os.type(),
        timeact: os.uptime() / 60,
        ip: ips,
        model: os.hostname(),
    };
    io.emit('usage', usage);
}, 1000);