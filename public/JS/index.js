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

let chart = null;

socket.on('usage', function (usage) {

    const memoryUsage = usage.memory.percentage;

    if (!chart) {
        chart = new Chart(document.getElementById('memory-chart'), {
            type: 'horizontalBar',
            data: {
                datasets: [{
                    label: 'Memoria usada',
                    data: [memoryUsage],
                    backgroundColor: '#00C2CB',
                    borderColor: '#3498db',
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3498db',
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            }
        });
    } else {
        chart.data.datasets[0].data.push(memoryUsage);
        chart.update();
    }

    setInterval(() => {
        if (chart) {
            if (chart.data.datasets[0].data.length > 60) {
                chart.data.datasets[0].data.shift();
            }
            chart.update();
        }
    }, 1000);

    document.getElementById('cpu').innerHTML = usage.CPU.length;
    document.getElementById('cpumodel').innerHTML = usage.CPU[0].model;
    document.getElementById('core1').innerHTML = usage.CPU[0].speed;
    document.getElementById('memory').innerHTML = usage.memory.used.toFixed(3);
    document.getElementById('disk').innerHTML = usage.memory.total.toFixed(3);
    document.getElementById('sisoperativo').innerHTML = usage.operatingSystem
    document.getElementById('timeact').innerHTML = usage.uptime.toFixed(0)
    document.getElementById('ip-address').innerHTML = usage.ip;
    document.getElementById('c-model').innerHTML = usage.hostname;
    document.getElementById('porce').innerHTML = usage.memory.percentage.toFixed(3);
});
