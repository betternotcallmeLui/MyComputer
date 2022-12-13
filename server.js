const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const os = require('os');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

const networkInterfaces = os.networkInterfaces();
const ips = Object.values(networkInterfaces)
    .flatMap(iface => iface)
    .filter(iface => iface.family === 'IPv4')
    .map(iface => iface.address);

setInterval(() => {
    const usage = {
        CPU: os.cpus(),
        memory: {
            total: os.totalmem() / 1024 / 1024 / 1024,
            free: os.freemem() / 1024 / 1024 / 1024,
            used: (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024,
            percentage: (1 - (os.freemem / os.totalmem)) * 100,

        },
        operatingSystem: os.type(),
        uptime: os.uptime(),
        hostname: os.hostname(),
        ip: ips,
    };
    io.emit('usage', usage);
}, 1000);





