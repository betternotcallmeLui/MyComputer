// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const os = require('os');

// const PORT = process.env.PORT || 3000;

// const networkInterfaces = os.networkInterfaces();
// let serverIp;

// for (let interface in networkInterfaces) {
//     for (let i = 0; i < networkInterfaces[interface].length; i++) {
//         let addr = networkInterfaces[interface][i];
//         if (addr.family === "IPv4") {
//             serverIp = addr.address;
//             break;
//         }
//     }
// }

// server.listen(PORT, function () {
//     console.log('Listening on port ' + PORT);
// });

// app.use(express.static('public'));
// app.get('*', function(req, res) {
//     res.sendFile('public/index.html', { root: __dirname });
// });

// setInterval(function () {

//     const usage = {
//         cpu: os.cpus(),
//         memory: (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024,
//         disk: os.totalmem() / 1024 / 1008 / 1000,
//         usedMemory: os.freemem(),
//         totalMemory: os.totalmem(),
//         sisoperativo: os.type(),
//         timeact: os.uptime() / 60,
//         model: os.hostname(),
//         porce: 100 - (os.freemem / os.totalmem) * 100,
//         ip: serverIp,
//     };
//     io.emit('usage', usage);
// }, 1000);

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
            percentage: 100 - (os.freemem / os.totalmem) * 100,
        },
        operatingSystem: os.type(),
        uptime: os.uptime(),
        hostname: os.hostname(),
        ip: ips,
    };
    io.emit('usage', usage);
}, 1000);





