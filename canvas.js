const canvas = document.getElementById("screen"),
context = canvas.getContext('2d'),

animacion = () => {
    arregloDibujos[vidas]();
};

// Canvas más nítido
canvas.width = 660;
canvas.height = 380;
context.scale(2, 2);

// Coordenadas y características del dibujo
function render(x, y, lineX, lineY) {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.moveTo(x, y);
    context.lineTo(lineX, lineY);
    context.stroke(); 
}

function dibujarCirculo() {
    context.beginPath();
    context.arc(150, 34, 13, 0, Math.PI * 2);
    context.stroke();
}

/* Los elementos del arregloDibujos son llamados en la función animación dependiendo del número de vidas del jugador. 
Por ejemplo, 9 vidas corresponden a la posición 9 del arreglo (primeraLinea) que es dibujada en el canvas como la primera línea horizontal
...Y así sucesivamente 
*/

const arregloDibujos = [
    piernaDerecha = () => render(150, 90, 127, 110),
    piernaIzquierda = () => render(150, 90, 173, 110),
    brazoDerecho = () => render(150, 52, 130, 70),
    brazoIzquierdo = () => render(150, 52, 170, 70),
    cuerpo = () => render(150, 47, 150, 90),
    dibujarCirculo,
    cuartaLinea = () => render(150, 0, 150, 20),
    terceraLinea = () => render(80, 0, 150, 0),
    segundaLinea = () => render(80, 0, 80, 200),
    primeraLinea = () => render(70, 189, 250, 189)    
]; 