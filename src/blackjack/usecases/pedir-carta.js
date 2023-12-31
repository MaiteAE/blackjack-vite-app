 

  //funcion para pedir carta
  export const pedirCarta = (deck) => {

    if (!deck || deck.length === 0) {
      throw "No hay más cartas";
    }

    return deck.pop();
  };