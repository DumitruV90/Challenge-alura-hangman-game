const startGame = document.getElementById("iniciar-juego");
const inputText = document.getElementById("input-text");
const addBtn = document.getElementById("add-Btn");
const clue = document.getElementById("clue");
const myKeyboard = document.getElementById("keyboard");
const home = document.getElementById("home");
const reintentar = document.getElementById("retry");

let arregloPalabras = ["APPLE",
    "LIVERPOOL",
    "UNCHARTED",
    "RIVENDELL",
    "TOM-RIDDLE",
    "NINTENDO",
    "TESLA",
    "JOHN-LENNON",
    "LINUS-TORVALDS",
    "JAMES-WEBB"];

const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Inicialización de variables 
let letras;
let lista;
let palabraSeleccionada;
let intento;
let arregloIntentos;
let vidas;
let contador;
let espacio;
let acierto;


// Estructura del teclado en la pantalla
startGame.addEventListener("click", function () {
    // La división start desaparece de la pantalla
    document.getElementById("start").style.display = "none";
    // La división play pasa de tener la propiedad 'display: none' (ver hoja de estilos CSS) a tener la propiedad 'display: block'. Es decir, ya se puede ver en la pantalla
    document.getElementById("play").style.display = "block";

    letras = document.createElement("ul");

    for (let i = 0; i < alfabeto.length; i++) {
        // Las letras del alfabeto o el teclado virtual son simplemente una lista de ítems (li) contenida en una lista no ordenada (ul)
        letras.id = "alfabeto";
        lista = document.createElement("li");
        lista.id = "letra";
        lista.innerHTML = alfabeto[i];
        revisar();
        myKeyboard.appendChild(letras);
        letras.appendChild(lista);
    }
    jugar();
    pista();
});

function jugar() {
    // Selección de la palabra aleatoria
    palabraSeleccionada = arregloPalabras[Math.floor(Math.random() * arregloPalabras.length)]
    palabraSeleccionada = palabraSeleccionada.replace(/\s/g, "-");

    arregloIntentos = [];
    vidas = 10;
    contador = 0;
    espacio = 0;

    resultado();
    comentarios();
    canvas();
}

function revisar() {
    lista.onclick = function () {
        let shot = this.innerHTML;
        this.setAttribute("class", "active");
        // Las letras ya seleccionadas dejarán de tener incidencia en la cantidad de vidas del jugador 
        this.onclick = null;

        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (palabraSeleccionada[i] === shot) {
                arregloIntentos[i].innerHTML = shot;
                contador += 1;
            }
        }
        let check = palabraSeleccionada.indexOf(shot);
        // Si no hay coincidencias (-1) entre la letra seleccionada por el usuario y alguna letra de la palabra seleccionada, entonces se resta una vida 
        if (check === -1) {
            vidas -= 1;
            comentarios();
            animacion();
        } else {
            comentarios();
        }
    }
}

// Estructura y visualización de la palabra seleccionada en la pantalla
function resultado() {
    let guionBajo = document.getElementById("underscore");
    acierto = document.createElement("ul");

    for (let i = 0; i < palabraSeleccionada.length; i++) {
        acierto.setAttribute("id", "my-word");
        intento = document.createElement("li");
        intento.setAttribute("class", "intento");
        // Verificación de la existencia de espacios en la palabra seleccionada
        if (palabraSeleccionada[i] === "-") {
            intento.innerHTML = "-";
            espacio = 1;
        } else {
            intento.innerHTML = "_";
        }

        arregloIntentos.push(intento);
        guionBajo.appendChild(acierto);
        acierto.appendChild(intento);
    }
}

function comentarios() {
    let mostrarVidas = document.getElementById("lives");

    mostrarVidas.innerHTML = `Tienes ${vidas} vidas`;
    if (vidas < 1) {
        mostrarVidas.innerHTML = "Perdiste!, vuelve a intentarlo";
        // Al perder, la pista y el teclado desaparecen de la pantalla
        clue.style.display = "none";
        myKeyboard.style.display = "none";
    }
    for (let i = 0; i < arregloIntentos.length; i++) {
        if (contador + espacio === arregloIntentos.length) {
            mostrarVidas.innerHTML = "Genial, ganaste!";
            // Al ganar, la pista y el teclado también desaparecen de la pantalla
            clue.style.display = "none";
            myKeyboard.style.display = "none";
        }
    }
}

function pista() {
    let mostrarPista = document.getElementById("clue");

    let pistas = ["una empresa icónica de Cupertino, California",
        "un equipo del fútbol inglés muy reconocido ",
        "una saga de videojuegos muy famosa",
        "un valle de la tierra media",
        "antagonista de la saga de Harry Potter",
        "es la casa de un famoso fontanero",
        "apellido de un legendario inventor",
        "ex integrante de los Beatles",
        "ingeniero de software finlandés",
        "telescopio lanzado recientemente al espacio"];
    // Selección de los índices de los arreglos de las palabras y pistas. El primer elemento del arreglo pistas debe coincidir con el primer elemento del arreglo palabras
    let indicePalabras = arregloPalabras.indexOf(palabraSeleccionada);
    let indicePistas = pistas[indicePalabras];

    // Si el índice de pistas es indefinido es porque la palabra seleccionada corresponde a la ingresada por el usuario
    if (indicePistas === undefined) {
        mostrarPista.innerHTML = `Pista: Ya no es un secreto para ti`;
    } else {
        mostrarPista.innerHTML = `Pista: ${indicePistas}`;
    }

}

inputText.addEventListener("keypress", function (event) {

    // Si el usuario presiona la tecla 'enter' la función en el botón 'agregar' es ejecutada
    if (event.key === "Enter") {
        // La acción por defecto es cancelada, si es necesario
        event.preventDefault();
        addBtn.click();
    }
});

addBtn.addEventListener("click", function () {
    // A la nueva palabra agregada por el jugador se le retiran los acentos, es covertida a mayúsculas y se reemplazan los espacios en blanco por un guión 
    let entradaTexto = inputText.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

    // Únicamente son válidas las letras del alfabeto 
    let regEx = /^[A-Z][A-Z\s]*$/;

    if (!entradaTexto.match(regEx)) {
        swal("Oops!", "Recuerda escribir únicamente letras del alfabeto", "error");
    } else {
        // La nueva palabra ingresada por el usuario es validada y agregada al arregloPalabras
        let updateText = entradaTexto.replaceAll(' ', '-');
        arregloPalabras.push(updateText);
        inputText.value = "";
    }

});

home.addEventListener("click", function () {
    location.reload();
});

reintentar.addEventListener("click", function () {
    this.blur();
    acierto.parentNode.removeChild(acierto);
    letras.parentNode.removeChild(letras);
    context.clearRect(0, 0, 300, 300);
    // Al reiniciar el juego, la pista y el teclado reaparecen en la pantalla.
    clue.style.display = "block";
    myKeyboard.style.display = "block";
    startGame.click();
});



