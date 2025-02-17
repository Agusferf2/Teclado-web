const textos = [
    "das",
    "Los pulpos tienen tres corazones y su sangre es de color azul debido a la presencia de hemocianina en lugar de hemoglobina.",
    "La luz del Sol tarda aproximadamente ocho minutos y veinte segundos en viajar desde su superficie hasta la Tierra.",
    "El ADN humano, si se desenrollara por completo, podría extenderse hasta el Sol y regresar varias veces.",
    "Las abejas pueden reconocer rostros humanos utilizando un proceso similar al que usan los primates para identificar personas.",
    "Los tiburones han existido en la Tierra durante más de 400 millones de años, incluso antes que los dinosaurios.",
    "Las computadoras modernas pueden realizar cálculos en una fracción de segundo que tomarían miles de años a un ser humano.",
    "Los koalas tienen huellas dactilares tan similares a las humanas que pueden confundir a los expertos forenses.",
    "El núcleo de la Tierra es casi tan caliente como la superficie del Sol, alcanzando temperaturas de hasta 6000 grados Celsius.",
    "Los relámpagos pueden calentar el aire circundante a temperaturas cinco veces más altas que la superficie del Sol.",
    "El Monte Everest crece aproximadamente cuatro milímetros cada año debido al movimiento de las placas tectónicas."
];

const textoAleatorio = "das";

const text = document.getElementById('text');

const teclado = document.querySelector('.teclado');

const teclas = document.querySelectorAll('.tecla');

const input = document.getElementById('input');

const contador = document.getElementById('contador');

text.innerHTML = textoAleatorio;

window.addEventListener('keydown', (event) => {
    const tecla = document.querySelector(`.tecla[data-key="${event.code}"]`); 
    
    const presskey = () => {
        tecla.classList.add('active');
        setTimeout(() => {
            tecla.classList.remove('active');
        }, 100);
    }

    switch (tecla.innerText){
        case "Backspace":
            input.value= input.value.slice(0,-1);
                presskey();
                break;
            case "Tab":
                input.value += "    ";
                presskey();
                break;
            case "CapsLock":
                teclas.forEach(tecla => {
                    tecla.classList.toggle('mayuscula');
                })
                presskey();
                break;
            case "Enter":
                input.value += "\n";
                presskey();
                break;
            case "Space":
                input.value += " ";
                presskey();
                break;
            default:
                if (tecla.classList.contains('mayuscula')){
                    input.value += tecla.innerHTML.toUpperCase();
                }else{
                    teclamin = tecla.innerHTML.toLowerCase();
                    input.value += teclamin;
                }
                input.dispatchEvent(new Event('input'));
                presskey();
            }
});

let cronometro;
let tiempoIniciado = false;

function iniciarCronometro() {
    let segundos = 0;
    let minutos = 0;
    cronometro = setInterval(() => {
        contador.innerHTML = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        segundos++;
        if (segundos == 60) {
            segundos = 0;
            minutos++;
        }
    }, 1000);
}

input.addEventListener('input', () => {
    if (text.innerHTML == input.value){ 
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <h2>¡Completaste con éxito!</h2>
            <p>Lo completaste en ${contador.innerHTML}</p>
            <button id="modal-btn">Cerrar</button>
        `;
        document.body.appendChild(modal);
        const modalBtn = document.getElementById('modal-btn');
        modalBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        console.log(`Lo completaste en ${contador.innerHTML}`)
        contador.innerHTML = "00:00";
        input.value = "";
        tiempoIniciado = false;
        text.classList.remove('incorrecto');
        text.classList.add('correcto');
        clearInterval(cronometro);
    } else if (text.innerHTML.startsWith(input.value)){
        text.classList.remove('incorrecto');
        text.classList.add('correcto');
        console.log("vas bien")
    }  else {
        text.classList.remove('correcto');
        text.classList.add('incorrecto');
        console.log("vas mal")
    } 
    if (!tiempoIniciado && input.value.length > 0) {
        iniciarCronometro();
        tiempoIniciado = true;
    }
})

const btnReiniciar = document.querySelector('#btnReiniciar');
const btnCambiar = document.querySelector('#btnCambiar');

const reiniciar = () => {
    input.value = "";
    text.classList.remove('incorrecto');
    text.classList.remove('correcto');
    clearInterval(cronometro);
    contador.innerHTML = "00:00";
    tiempoIniciado = false;
}

const cambiarFrase = () => {
    text.innerHTML = textos[Math.floor(Math.random() * (textos.length))];
    input.value = "";
    text.classList.remove('incorrecto');
    text.classList.remove('correcto');
    clearInterval(cronometro);
    contador.innerHTML = "00:00";
    tiempoIniciado = false;
}

btnReiniciar.addEventListener('click', reiniciar);
btnCambiar.addEventListener('click', cambiarFrase);