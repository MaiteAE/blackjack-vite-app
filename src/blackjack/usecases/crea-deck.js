import _ from 'underscore';

/**
 * Esta funcion crea un nuevo deck
 * @param {array<string>} tiposDeCartas 
 * @param {array<string>} tiposEspeciales 
 * @returns {array<string>} retorna un nuevo deck
 */
  
export const crearDeck = (tiposDeCartas, tiposEspeciales) => {

  if(!tiposDeCartas || (tiposDeCartas.length === 0)) throw new Error('tiposDeCartas es obligatorio como array string');
  if(!tiposEspeciales || (tiposEspeciales.length === 0)) throw new Error('tiposEspeciales es obligatoriocomo array string');
  

  let deck = [];

  for (let i = 2; i <= 10; i++) {
    for (const tipo of tiposDeCartas) {
      deck.push(i + tipo);
    }
  }

  for (const tipo of tiposDeCartas) {
    for (const esp of tiposEspeciales) {
      deck.push(esp + tipo);
    }
  }

  deck = _.shuffle(deck);
  return deck;
};