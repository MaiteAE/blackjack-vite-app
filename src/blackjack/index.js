import _ from "underscore";
import { crearDeck, pedirCarta, valorCarta } from "./usecases";


const tipos = ["C", "D", "H", "S"],
      especiales = ["A", "J", "Q", "K"];

let puntosJugadores = [];
let deck = [];

//referencias a html
const btnPedir = document.querySelector("#btnPedir"),
  btnTerminar = document.querySelector("#btnTerminar"),
  btnIniciar = document.querySelector("#btnIniciar");

const divCartasJugadores = document.querySelectorAll(".div-cartas"),
  puntosHtml = document.querySelectorAll("small");

const inicializarJuego = (numJugadores = 2) => {
  deck = crearDeck(tipos, especiales);
  puntosJugadores = [];

  for (let i = 0; i < numJugadores; i++) {
    puntosJugadores.push(0);
  }

  puntosHtml.forEach((elem) => (elem.innerHTML = 0));
  divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

  btnPedir.disabled = false;
  btnTerminar.disabled = false;
};

deck = crearDeck(tipos, especiales);

//turno: el 0 es el primer jugador y el ultimo la computadora
const acumularPuntos = (carta, turno) => {
  puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
  puntosHtml[turno].innerText = puntosJugadores[turno];
  return puntosJugadores[turno];
};
//crea la carta en el html
const crearCarta = (carta, turno) => {
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugadores[turno].append(imgCarta);
};

const ganador = () => {
  const [puntosMinimos, puntosComputadora] = puntosJugadores;

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Empate! Nadie gana :(");
    } else if (puntosMinimos > 21) {
      alert("Lo siento, la computadora gana");
    } else if (puntosComputadora > 21) {
      alert("El jugador gana :)");
    } else {
      alert("La computadora gana");
    }
  }, 100);
};

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  let puntosComputadora = 0;
  do {
    const carta = pedirCarta(deck);
    puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
    crearCarta(carta, puntosJugadores.length - 1);
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  ganador();
};

//eventos

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta(deck);
  const puntosJugador = acumularPuntos(carta, 0);

  crearCarta(carta, 0);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnTerminar.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true;
    btnTerminar.disabled = true;
    setTimeout(() => {
      alert("¡Ganaste!");
    }, 100);
  }
});

btnTerminar.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnTerminar.disabled = true;
  turnoComputadora(puntosJugadores[0]);
});

btnIniciar.addEventListener("click", () => {
  console.clear();

  inicializarJuego();
});


