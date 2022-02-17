const screen = document.getElementById("screen");
const context = screen.getContext('2d');

const animacion = () => {
    arregloDibujos[vidas]();
}

function canvas() {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
}

function dibujarCirculo() {
    context.beginPath();
    context.arc(150, 34, 13, 0, Math.PI * 2);
    context.stroke();
}

function dibujar(x, y, lineX, lineY) {
    context.moveTo(x, y);
    context.lineTo(lineX, lineY);
    context.stroke(); 
}

/* Los elementos del arregloDibujos serán llamados en la función animación dependiendo del número de vidas del jugador. 
Por ejemplo, 9 vidas corresponden a la posición 9 del arreglo (primeraLinea) y se dibujaría en el canvas la primera línea horizontal del juego.
...Y así sucesivamente 
*/

const arregloDibujos = [
    piernaDerecha = () => dibujar(150, 90, 127, 110),
    piernaIzquierda = () => dibujar(150, 90, 173, 110),
    brazoDerecho = () => dibujar(150, 52, 130, 70),
    brazoIzquierdo = () => dibujar(150, 52, 170, 70),
    cuerpo = () => dibujar(150, 47, 150, 90),
    dibujarCirculo,
    cuartaLinea = () => dibujar(150, 0, 150, 20),
    terceraLinea = () => dibujar(60, 0, 150, 0),
    segundaLinea = () => dibujar(60, 0, 60, 200),
    primeraLinea = () => dibujar(50, 150, 250, 150)    
]; 