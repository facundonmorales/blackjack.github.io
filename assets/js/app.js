
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0;
let puntosCrupier = 0;

//Referencias
const btnNewGame = document.querySelector('#btnNewGame');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const puntosHTML = document.querySelectorAll('small');
const cartasJugador = document.querySelector('#jugador-cartas');
const cartasCrupier = document.querySelector('#crupier-cartas');

//Esta funcion crea una nueva baraja
const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for (let tipo of tipos) {
            deck.push( i + tipo )
        }
    }
    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo)
        }
    }

    //console.log(deck)
    deck = _.shuffle( deck );
    //console.log( deck );
    return deck;

}

crearDeck();

//Esta funcion me permite pedir una carta

const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.shift()
    //console.log(deck);
    //console.log(carta);

    return carta;
}

//pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);

    return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : (valor*1);

    //console.log(puntos);
    //console.log({valor})
}

//Turno de la computadora

const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosCrupier = puntosCrupier + valorCarta(carta);
        puntosHTML[1].innerText = puntosCrupier;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        cartasCrupier.append(imgCarta);
        if (puntosMinimos > 21){
            break;
        }
    } while( (puntosCrupier < puntosMinimos) && (puntosMinimos <= 21))
    
    setTimeout(() => {
    if(puntosCrupier === puntosMinimos){
        alert('Empate');
    }else if((puntosCrupier > puntosMinimos) && (puntosCrupier > 21) ){
        alert('Has Ganado!')
    }else{
        alert('Has Perdido!')
    }
}, 15);
}

//Eventos

btnNewGame.addEventListener('click', () =>{
    deck = [];
    deck = crearDeck();
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    puntosJugador = 0;
    puntosCrupier = 0;

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    cartasCrupier.innerHTML = '';
    cartasJugador.innerHTML = '';
    //console.log(reset);
})
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    cartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Has perdido!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('Has ganado!')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

//TO DO Borrar