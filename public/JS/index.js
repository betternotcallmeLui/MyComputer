const typed = new Typed('.typed', {
    strings: [
        '<i class="opcion">memoria.</i>',
        '<i class="opcion">procesador.</i>',
        '<i class="opcion">dirección IP.</i>',
        '<i class="opcion">sistema.</i>'
    ],

    typeSpeed: 90, // Velocidad en mlisegundos para poner una letra,
    startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
    backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
    smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
    shuffle: false, // Alterar el orden en el que escribe las palabras.
    backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
    loop: true, // Repetir el array de strings
    loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
    showCursor: true, // Mostrar cursor palpitanto
    cursorChar: '|', // Caracter para el cursor
    contentType: 'html', // 'html' o 'null' para texto sin formato
});

const socket = io();
socket.on('usage', function (usage) {
    document.getElementById('cpu').innerHTML = usage.cpu.length;
    document.getElementById('cpumodel').innerHTML = usage.cpu[0].model;
    document.getElementById('core1').innerHTML = usage.cpu[0].speed;
    document.getElementById('memory').innerHTML = usage.memory.toFixed(3);
    document.getElementById('disk').innerHTML = usage.disk.toFixed(3);
    document.getElementById('sisoperativo').innerHTML = usage.sisoperativo
    document.getElementById('timeact').innerHTML = usage.timeact.toFixed(0)
    document.getElementById('ip-address').innerHTML = usage.ip;
    document.getElementById('c-model').innerHTML = usage.model;
});