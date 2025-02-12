const teclado = document.querySelector('.teclado');

const teclas = document.querySelectorAll('.tecla');

teclas.forEach(tecla => {
    tecla.addEventListener('click', () => {
        const input = document.getElementById('input');
        switch (tecla.innerText){
            case "Backspace":
                input.value= input.value.slice(0,-1);
                break;
            case "Tab":
                input.value += "    ";
                break;
            case "CapsLock":
                break;
            case "Enter":
                input.value += "\n";
                break;
            case "Space":
                input.value += " ";
                break;
            default:
                input.value += tecla.innerText;
        }
    });
});

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
                input.value += tecla.innerText;
                presskey();
            }
});