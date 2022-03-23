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
    context.arc(155, 34, 13, 0, Math.PI * 2);
    context.stroke();
}

/* Los elementos del arregloDibujos son llamados en la función animación dependiendo del número de vidas del jugador. 
Por ejemplo, 9 vidas corresponden a la posición 9 del arreglo (primeraLinea) que es dibujada en el canvas como la primera línea horizontal
...Y así sucesivamente 
*/

const arregloDibujos = [
    piernaDerecha = () => render(155, 90, 132, 110),
    piernaIzquierda = () => render(155, 90, 178, 110),
    brazoDerecho = () => render(155, 52, 135, 70),
    brazoIzquierdo = () => render(155, 52, 175, 70),
    cuerpo = () => render(155, 47, 155, 90),
    dibujarCirculo,
    cuartaLinea = () => render(155, 0, 155, 20),
    terceraLinea = () => render(85, 0, 155, 0),
    segundaLinea = () => render(85, 0, 85, 200),
    primeraLinea = () => render(30, 189, 300, 189)    
]; 