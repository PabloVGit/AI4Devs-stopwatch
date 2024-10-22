// Variables para el cronómetro
let cronometroInterval;
let cronoTime = 0;

// Variables para la cuenta atrás
let countdownInterval;
let countdownTime = 0;
let settingTime = '';

// Función para formatear el tiempo
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Función para actualizar el display
function updateDisplay(displayId, time) {
    document.getElementById(displayId).textContent = formatTime(time);
}

// Funciones para el cronómetro
function startCronometro() {
    if (!cronometroInterval) {
        cronometroInterval = setInterval(() => {
            cronoTime += 1000;
            updateDisplay('cronometroDisplay', cronoTime);
        }, 1000);
    }
}

function stopCronometro() {
    clearInterval(cronometroInterval);
    cronometroInterval = null;
}

function resetCronometro() {
    stopCronometro();
    cronoTime = 0;
    updateDisplay('cronometroDisplay', cronoTime);
}

// Eventos de los botones del cronómetro
document.getElementById('startCrono').addEventListener('click', startCronometro);
document.getElementById('stopCrono').addEventListener('click', stopCronometro);
document.getElementById('resetCrono').addEventListener('click', resetCronometro);

// Función para configurar la cuenta atrás
function handleNumberInput(num) {
    if (settingTime.length < 6) {
        settingTime += num;
        let hours = parseInt(settingTime.substring(0, 2) || '0');
        let minutes = parseInt(settingTime.substring(2, 4) || '0');
        let seconds = parseInt(settingTime.substring(4, 6) || '0');

        if (minutes > 59) minutes = 59;
        if (seconds > 59) seconds = 59;

        countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
        updateDisplay('cuentaAtrasDisplay', countdownTime);
    }
}

// Funciones para la cuenta atrás
function startCountdown() {
    if (!countdownInterval && countdownTime > 0) {
        countdownInterval = setInterval(() => {
            countdownTime -= 1000;
            updateDisplay('cuentaAtrasDisplay', countdownTime);

            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                countdownInterval = null;
                countdownTime = 0;
                updateDisplay('cuentaAtrasDisplay', countdownTime);
            }
        }, 1000);
    }
}

function stopCountdown() {
    clearInterval(countdownInterval);
    countdownInterval = null;
}

function resetCountdown() {
    stopCountdown();
    settingTime = '';
    countdownTime = 0;
    updateDisplay('cuentaAtrasDisplay', countdownTime);
}

// Eventos de los botones de la cuenta atrás
document.getElementById('startCountdown').addEventListener('click', startCountdown);
document.getElementById('stopCountdown').addEventListener('click', stopCountdown);
document.getElementById('resetCountdown').addEventListener('click', resetCountdown);

// Eventos para los botones numéricos
document.querySelectorAll('.grid button').forEach(button => {
    button.addEventListener('click', (e) => {
        handleNumberInput(e.target.textContent);
    });
});